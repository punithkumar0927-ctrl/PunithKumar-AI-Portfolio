const root=document.documentElement;
const themeToggle=document.getElementById("themeToggle");
const saved=localStorage.getItem("theme");
if(saved) root.dataset.theme=saved;
function updateThemeIcon(){themeToggle.textContent=root.dataset.theme==="light"?"☾":"☼"}
updateThemeIcon();
themeToggle.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="light"?"dark":"light";localStorage.setItem("theme",root.dataset.theme);updateThemeIcon()});

const menu=document.getElementById("navLinks"), menuBtn=document.getElementById("menuToggle");
menuBtn.addEventListener("click",()=>menu.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>menu.classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll("[data-count]").forEach(el=>{
  const target=Number(el.dataset.count);
  let n=0; const step=Math.max(1,Math.ceil(target/20));
  const timer=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(timer)}el.textContent=n+"+"},55);
});
document.getElementById("year").textContent=new Date().getFullYear();
