import { useEffect, useRef } from "react";

type ThreeModule = typeof import("three");

const PARTICLE_COUNT = 2000;

export default function ParticleBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void import("three")
      .then((THREE: ThreeModule) => {
        if (disposed) return;

        let renderer: InstanceType<ThreeModule["WebGLRenderer"]>;
        try {
          renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false, powerPreference: "low-power" });
        } catch (error) {
          host.dataset.unavailable = "true";
          console.error("Three.js particle background could not initialize WebGL.", error);
          return;
        }

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#080b14");
        const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
        camera.position.z = 15;

        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const drift = new Float32Array(PARTICLE_COUNT * 3);
        const blue = new THREE.Color("#6ea8ff");
        const purple = new THREE.Color("#a987ff");

        for (let index = 0; index < PARTICLE_COUNT; index += 1) {
          const offset = index * 3;
          positions[offset] = (Math.random() - 0.5) * 34;
          positions[offset + 1] = (Math.random() - 0.5) * 20;
          positions[offset + 2] = -Math.random() * 32;

          const color = blue.clone().lerp(purple, Math.random());
          const brightness = 0.55 + Math.random() * 0.45;
          colors[offset] = color.r * brightness;
          colors[offset + 1] = color.g * brightness;
          colors[offset + 2] = color.b * brightness;

          drift[offset] = (Math.random() - 0.5) * 0.045;
          drift[offset + 1] = 0.012 + Math.random() * 0.035;
          drift[offset + 2] = (Math.random() - 0.5) * 0.025;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({
          size: 0.075,
          sizeAttenuation: true,
          vertexColors: true,
          transparent: true,
          opacity: 0.82,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.35 : 1.7));
        renderer.setSize(host.clientWidth, host.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const pointer = new THREE.Vector2();
        const targetCamera = new THREE.Vector2();
        let frame = 0;
        let previousTime = 0;

        const resize = () => {
          const width = host.clientWidth;
          const height = host.clientHeight;
          if (!width || !height) return;
          camera.aspect = width / height;
          camera.position.x = width < 700 ? 0 : targetCamera.x;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          renderer.render(scene, camera);
        };

        const movePointer = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || reducedMotion.matches) return;
          const bounds = host.getBoundingClientRect();
          pointer.set(
            ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
            -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
          );
          targetCamera.set(pointer.x * 0.7, pointer.y * 0.45);
        };

        const resetPointer = () => {
          pointer.set(0, 0);
          targetCamera.set(0, 0);
        };

        const animate = (time: number) => {
          frame = window.requestAnimationFrame(animate);
          const delta = Math.min((time - previousTime) / 1000 || 0, 0.05);
          previousTime = time;

          const position = geometry.getAttribute("position") as InstanceType<ThreeModule["BufferAttribute"]>;
          for (let index = 0; index < PARTICLE_COUNT; index += 1) {
            const offset = index * 3;
            positions[offset] += drift[offset] * delta;
            positions[offset + 1] += drift[offset + 1] * delta;
            positions[offset + 2] += drift[offset + 2] * delta;

            if (positions[offset + 1] > 11) positions[offset + 1] = -11;
            if (positions[offset] > 18) positions[offset] = -18;
            if (positions[offset] < -18) positions[offset] = 18;
            if (positions[offset + 2] > 2) positions[offset + 2] = -32;
          }

          position.needsUpdate = true;
          camera.position.x += (targetCamera.x - camera.position.x) * Math.min(delta * 1.4, 1);
          camera.position.y += (targetCamera.y - camera.position.y) * Math.min(delta * 1.4, 1);
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
        };

        const observer = new ResizeObserver(resize);
        observer.observe(host);
        host.addEventListener("pointermove", movePointer);
        host.addEventListener("pointerleave", resetPointer);
        resize();
        if (!reducedMotion.matches) frame = window.requestAnimationFrame(animate);

        return () => {
          window.cancelAnimationFrame(frame);
          observer.disconnect();
          host.removeEventListener("pointermove", movePointer);
          host.removeEventListener("pointerleave", resetPointer);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .then((disposeScene) => {
        if (!disposeScene) return;
        cleanup = disposeScene;
        if (disposed) cleanup();
      })
      .catch((error: unknown) => {
        if (disposed) return;
        host.dataset.unavailable = "true";
        console.error("Three.js particle background failed to load.", error);
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={hostRef} className="particle-background" aria-hidden="true" />;
}
