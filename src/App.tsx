import { Fragment, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import resumeUrl from "../Punith_Kumar_Resume (2).pdf";
import ParticleBackground from "./ParticleBackground";
import profilePhoto from "./assets/images/profile.png";
import { certificates, emailAddress, githubUrl, linkedInUrl, projects, skillGroups } from "./data";
import type { Project, ProjectCategory } from "./data";

gsap.registerPlugin(ScrollTrigger);

const categories: Array<"All" | ProjectCategory> = ["All", "AI & ML", "Data", "Web", "Additional"];

type LetterRevealProps = {
  text: string;
  className: string;
  delay?: number;
  showCursor?: boolean;
};

// Keep words intact for responsive wrapping while revealing their letters in sequence.
function LetterReveal({ text, className, delay = 0, showCursor = false }: LetterRevealProps) {
  const reduceMotion = useReducedMotion();
  let letterIndex = 0;
  const words = text.split(" ");

  return (
    <span className={className} aria-hidden="true">
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          {wordIndex > 0 ? " " : null}
          <span className="letter-word">
            {Array.from(word).map((letter, index) => {
              const sequence = letterIndex++;
              return (
                <motion.span
                  className="heading-letter"
                  key={`${letter}-${index}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 9 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : delay + sequence * 0.035,
                    duration: reduceMotion ? 0 : 0.32,
                    ease: "easeOut",
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </span>
        </Fragment>
      ))}
      {showCursor && <span className="typing-cursor" aria-hidden="true" />}
    </span>
  );
}

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme still works for the current page when storage is unavailable.
    }
  }, [theme]);

  return { theme, toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark") };
}

function useScrollReveals(container: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = container.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".skills-grid").forEach((grid) => {
        gsap.fromTo(
          grid.querySelectorAll(".skill-group"),
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: { trigger: grid, start: "top 84%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".certificate-list").forEach((list) => {
        gsap.fromTo(
          list.querySelectorAll("li"),
          { autoAlpha: 0, x: 14 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: list, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".education-column").forEach((column) => {
        gsap.fromTo(
          column.querySelectorAll(".education-item"),
          { autoAlpha: 0, x: 18 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: column, start: "top 82%", once: true },
          },
        );
      });
    }, root);

    return () => {
      context.revert();
    };
  }, [container]);
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = dialog.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) {
          event.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("dialog-open");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("dialog-open");
      previousFocus.current?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="dialog-backdrop"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.22 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        className="project-dialog"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: reduceMotion ? 0 : 0.22 }}
      >
        <button ref={closeButton} className="icon-button dialog-close" onClick={onClose} aria-label="Close project details">
          <X size={18} />
        </button>
        <span className="mono eyebrow">{project.number} / {project.category}</span>
        <h2 id="dialog-title">{project.title}</h2>
        <p>{project.detail}</p>
        {project.highlights && (
          <ul className="project-highlights">
            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        )}
        <div className="tag-list">
          {project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
        </div>
      </motion.section>
    </motion.div>
  );
}

function App() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  useScrollReveals(root);

  useEffect(() => {
    if (reduceMotion) {
      setIsLoading(false);
      return;
    }

    const timeout = window.setTimeout(() => setIsLoading(false), 720);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  useEffect(() => {
    const sections = ["home", "about", "work", "experience", "skills", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const visibleProjects = category === "All"
    ? projects
    : projects.filter((project) => project.category === category);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${emailAddress}`;
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
    event.currentTarget.style.setProperty("--pointer-opacity", "1");
  };
  const tiltProjectCard = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const angle = Math.hypot(x, y) * 6.5;
    event.currentTarget.style.setProperty("--card-tilt", `${-y} ${x} 0 ${angle}deg`);
    event.currentTarget.style.setProperty("--light-x", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--light-y", `${(y + 0.5) * 100}%`);
  };
  const resetProjectCard = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty("--card-tilt");
    event.currentTarget.style.removeProperty("--light-x");
    event.currentTarget.style.removeProperty("--light-y");
  };

  return (
    <main ref={root} onPointerMove={trackPointer} onPointerLeave={(event) => event.currentTarget.style.setProperty("--pointer-opacity", "0")}>
      <div className="cursor-glow" aria-hidden="true" />
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="preloader"
            role="status"
            aria-label="Loading Punith Kumar AB portfolio"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
          >
            <div className="preloader-content">
              <span className="preloader-name">Punith Kumar <em>AB</em></span>
              <span className="mono preloader-caption">PORTFOLIO · 2026</span>
              <div className="preloader-track" aria-hidden="true">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.64, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <header className="site-header">
        <nav className="nav-shell container" aria-label="Main navigation">
          <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Punith Kumar home">
            pk<span>.</span>
          </a>
          <div className={`nav-links${menuOpen ? " is-open" : ""}`}>
            {[
              ["About", "#about"],
              ["Work", "#work"],
              ["Experience", "#experience"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className={activeSection === href.slice(1) ? "is-active" : undefined}
                aria-current={activeSection === href.slice(1) ? "location" : undefined}
              >
                {label}
              </a>
            ))}
            <a className="nav-resume" href={resumeUrl} download onClick={closeMenu}>
              Resume <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="nav-tools">
            <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              className="icon-button menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
      </header>

      <section id="home" className="hero hero-particle-scene">
        <ParticleBackground />
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className="availability"><span className="availability-dot" /> OPEN TO OPPORTUNITIES <span className="availability-divider">·</span> DAVANAGERE, INDIA</p>
          <motion.div
            className="planet profile-photo-frame hero-profile"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.24, duration: 0.65, ease: "easeOut" }}
          >
            <img className="profile-photo" src={profilePhoto} alt="Punith Kumar A B" />
          </motion.div>
          <h1 aria-label="Curious by nature. Engineer by choice.">
            <LetterReveal text="Curious by nature." className="hero-heading-line" delay={0.12} />
            <br />
            <LetterReveal
              text="Engineer by choice."
              className="hero-heading-highlight"
              delay={0.12 + "Curious by nature.".length * 0.035 + 0.12}
              showCursor
            />
          </h1>
          <p className="hero-intro">
            <motion.span
              className="hero-name-reveal"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.3, duration: 0.4 }}
            >
              I’m Punith
            </motion.span>
            {" — an "}
            <motion.span
              className="hero-title-reveal"
              initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: reduceMotion ? 0 : 0.46, duration: 0.7, ease: "easeOut" }}
            >
              AI &amp; ML engineer
            </motion.span>
            {" interested in turning complex ideas into useful, human-centered technology."}
          </p>
          <div className="hero-actions">
            <motion.a className="button button-primary" href="#work" whileHover={reduceMotion ? undefined : { y: -3, scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }}>Explore my work <ArrowDownRight size={16} /></motion.a>
            <motion.a className="text-link" href={`mailto:${emailAddress}`} whileHover={reduceMotion ? undefined : { x: 3 }}>Let’s talk <ArrowUpRight size={15} /></motion.a>
          </div>
          <div className="hero-meta">
            <div><span className="mono">01</span><strong>AI &amp; machine learning</strong></div>
            <div><span className="mono">02</span><strong>Data &amp; experimentation</strong></div>
            <div><span className="mono">03</span><strong>Thoughtful software</strong></div>
          </div>
        </motion.div>
        <a className="scroll-cue mono" href="#about"><ArrowDown size={14} /> SCROLL TO EXPLORE</a>
      </section>

      <section id="about" className="section section-about container">
        <div className="section-kicker scroll-reveal"><span className="mono">01</span><span className="eyebrow">A LITTLE ABOUT ME</span></div>
        <div className="about-grid">
          <h2 className="section-heading scroll-reveal">I like making<br />technology <em>matter.</em></h2>
          <div className="about-copy scroll-reveal">
            <p>
              I’m an Artificial Intelligence and Machine Learning engineer from Davanagere, Karnataka. I enjoy working across Python, data analysis, machine learning, and application development — especially when they come together to solve a real problem.
            </p>
            <p>
              During my Data Science internship at Prinston Smart Engineers, I worked on data preparation, exploratory analysis, and classification models. I’m now looking for opportunities to keep learning, contribute to a thoughtful team, and build practical AI-powered tools.
            </p>
            <a className="inline-link" href={resumeUrl} download>More about my journey <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="stat-strip scroll-reveal">
          <div><strong>05</strong><span>Selected projects</span></div>
          <div><strong>8.0</strong><span>Degree CGPA / 10</span></div>
          <div><strong>06</strong><span>Certifications</span></div>
          <p className="mono">LEARNING IS THE<br />LONG GAME ↗</p>
        </div>
      </section>

      <section id="work" className="section section-work">
        <div className="container">
          <div className="section-kicker scroll-reveal"><span className="mono">02</span><span className="eyebrow">SELECTED WORK</span></div>
          <div className="work-heading scroll-reveal">
            <h2 className="section-heading">Small ideas.<br /><em>Real intent.</em></h2>
            <p>A few explorations in AI, data, software, and connected systems.</p>
          </div>
          <div className="filter-row" role="group" aria-label="Filter projects by category">
            {categories.map((item) => (
              <button
                className={`filter-chip${category === item ? " is-active" : ""}`}
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
            <span className="filter-count mono">{String(visibleProjects.length).padStart(2, "0")} PROJECTS</span>
          </div>
          <motion.div layout={!reduceMotion} className="project-grid">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.article
                  className={`project-card project-card-${index + 1}`}
                  key={project.number}
                  layout={!reduceMotion}
                  onPointerMove={tiltProjectCard}
                  onPointerLeave={resetProjectCard}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : index * 0.055 }}
                >
                  <div className="project-card-top">
                    <span className="mono project-number">{project.number} / {String(projects.length).padStart(2, "0")}</span>
                    <span className="project-category">{project.category}</span>
                  </div>
                  <div className="project-mark" aria-hidden="true">
                    {project.category === "AI & ML" ? <Sparkles /> : project.category === "Web" ? <Code2 /> : <ArrowDownRight />}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="project-card-techs" aria-label="Technologies">
                      {project.technologies.slice(0, 4).map((technology) => (
                        <span className="tag" key={technology}>{technology}</span>
                      ))}
                    </div>
                  )}
                  <div className="project-card-bottom">
                    <span className="mono">{project.technologies.length > 0 ? `${project.technologies.length} TECHNOLOGIES` : "DETAILS NOT PROVIDED IN RESUME"}</span>
                    <button className="project-open" onClick={() => setActiveProject(project)} aria-label={`View details for ${project.title}`}>
                      DETAILS <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          <a className="github-link scroll-reveal" href={`${githubUrl}?tab=repositories`} target="_blank" rel="noreferrer">
            More experiments on GitHub <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <section id="experience" className="section section-experience container">
        <div className="section-kicker scroll-reveal"><span className="mono">03</span><span className="eyebrow">EXPERIENCE & EDUCATION</span></div>
        <div className="experience-grid">
          <div className="experience-column scroll-reveal">
            <h2 className="column-heading">Learning<br /><em>by doing.</em></h2>
            <article className="experience-item">
              <div className="experience-meta mono"><span>JAN — MAY 2026</span><span>INTERNSHIP</span></div>
              <h3>Data Science Intern</h3>
              <p className="experience-place">Prinston Smart Engineers</p>
              <ul>
                <li>Built Python preprocessing workflows with Pandas and NumPy.</li>
                <li>Explored datasets and evaluated classification models including Logistic Regression, Random Forest, and SVM.</li>
                <li>Prepared model evaluations and project reports for data-informed decisions.</li>
              </ul>
              <div className="internship-project"><span className="mono">PROJECT</span><strong>Medical Cost Prediction</strong><span>Random Forest · Linear Regression · Scikit-learn</span></div>
            </article>
          </div>
          <div className="education-column scroll-reveal">
            <h2 className="column-heading">Foundations<br /><em>for what’s next.</em></h2>
            <article className="education-item">
              <span className="education-year mono">2022 — 2026</span>
              <div><h3>B.E. Artificial Intelligence &amp; Machine Learning</h3><p>GM Institute of Technology · Davanagere</p><strong>CGPA 8.0 / 10</strong></div>
            </article>
            <article className="education-item">
              <span className="education-year mono">2020 — 2022</span>
              <div><h3>Pre-University · Science</h3><p>Science Academy PU College · Karnataka</p><strong>73.16%</strong></div>
            </article>
            <div className="certification-block">
              <h3 className="eyebrow">ALWAYS IN PROGRESS</h3>
              <ul className="certificate-list">
                {certificates.map((certificate) => (
                  <li key={certificate.title}><span>{certificate.title}</span><small>{certificate.issuer} · {certificate.year}</small></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section section-skills">
        <div className="container">
          <div className="section-kicker scroll-reveal"><span className="mono">04</span><span className="eyebrow">MY TOOLKIT</span></div>
          <div className="skills-heading scroll-reveal">
            <h2 className="section-heading">Tools are useful.<br /><em>Curiosity is better.</em></h2>
            <p>A growing set of tools I use to learn, prototype, and build.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-group" key={group.title}>
                <span className="mono skill-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <div className="tag-list">{group.skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section section-contact container">
        <div className="contact-orb" aria-hidden="true" />
        <div className="section-kicker scroll-reveal"><span className="mono">05</span><span className="eyebrow">THE NEXT CHAPTER</span></div>
        <div className="contact-content scroll-reveal">
          <p className="mono contact-prelude">HAVE A GOOD PROBLEM TO SOLVE?</p>
          <h2>Let’s make<br /><em>something useful.</em></h2>
          <a className="button button-light" href={`mailto:${emailAddress}`}>Start a conversation <ArrowUpRight size={16} /></a>
          <button className="copy-email" onClick={copyEmail}>
            {copied ? <Check size={14} /> : <Mail size={14} />}
            {copied ? "Email copied" : emailAddress}
          </button>
        </div>
        <div className="contact-socials scroll-reveal">
          <a href={githubUrl} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowRight size={14} /></a>
          <a href={linkedInUrl} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowRight size={14} /></a>
          <span className="mono">DAVANAGERE, INDIA · IST (UTC +5:30)</span>
        </div>
      </section>

      <footer className="site-footer container">
        <a className="wordmark" href="#home">pk<span>.</span></a>
        <p>Designed with intent. Built with curiosity.</p>
        <span className="mono">© {new Date().getFullYear()} PUNITH KUMAR A B</span>
      </footer>

      <AnimatePresence>
        {activeProject && (
          <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
