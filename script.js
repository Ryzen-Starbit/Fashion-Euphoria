const loader = document.getElementById("loader");
const hero = document.querySelector(".hero");
const video = document.getElementById("heroVideo");
document.body.style.overflow = "hidden";
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.remove();
      document.body.style.overflow = "auto";
      hero.classList.add("show");
      video.muted = true;
      video.setAttribute("playsinline", "");
      video.play().catch(err => {
        console.log("Autoplay blocked:", err);
      });
    }, 600);
  }, 3200); 
});
const muteBtn = document.getElementById("muteToggle");
muteBtn.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    video.volume = 1;
    muteBtn.textContent = "🔊";
  } else {
    video.muted = true;
    muteBtn.textContent = "🔇";
  }
});
setTimeout(()=>{
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
}, 700);
const c = document.getElementById("bg");
const ctx = c.getContext("2d");
function resizeCanvas(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
const pts = Array.from({ length: 120 }, () => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height,
  vx: (Math.random() - .5) * .4,
  vy: (Math.random() - .5) * .4
}));
function animateParticles(){
  ctx.clearRect(0,0,c.width,c.height);
  pts.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>c.width)p.vx*=-1;
    if(p.y<0||p.y>c.height)p.vy*=-1;
    ctx.fillStyle="rgba(255,75,216,.9)";
    ctx.fillRect(p.x,p.y,3,3);
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
const wheel = document.getElementById("wheel");
wheel.innerHTML += wheel.innerHTML;
let x = 0;
function updateCenter(){
  const mid = window.innerWidth / 2;
  document.querySelectorAll(".card").forEach(card=>{
    const r = card.getBoundingClientRect();
    const dist = Math.abs(mid - (r.left + r.width / 2));
    card.classList.toggle("center", dist < 140);
  });
}
function spin(){
  x -= 0.4;
  if(Math.abs(x) > wheel.scrollWidth / 2) x = 0;
  wheel.style.transform = `translateX(${x}px)`;
  updateCenter();
  requestAnimationFrame(spin);
}
spin();
const cards = document.querySelectorAll(".card");
const info = document.getElementById("sponsorInfo");
const infoTitle = info.querySelector("h3");
const infoDesc = info.querySelector("p");
cards.forEach(card=>{
  card.addEventListener("mouseenter", ()=>{
    if(card.classList.contains("center")){
      wheel.classList.add("paused");
      card.classList.add("active");
      infoTitle.textContent = card.dataset.title;
      infoDesc.textContent = card.dataset.desc;
      info.style.opacity = 1;
    }
  });
  card.addEventListener("mouseleave", ()=>{
    wheel.classList.remove("paused");
    card.classList.remove("active");
    info.style.opacity = 0;
  });
});
const obs = new IntersectionObserver(e=>{
  e.forEach(i=> i.isIntersecting && i.target.classList.add("show"));
},{threshold:.2});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
const mo = document.getElementById("mo");
const d = document.getElementById("d");
const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");
const target = new Date("2025-03-15T18:00:00").getTime();
setInterval(()=>{
  let t = target - Date.now();
  if(t < 0) return;
  mo.textContent = Math.floor(t / (1000*60*60*24*30));
  d.textContent = Math.floor(t / (1000*60*60*24)) % 30;
  h.textContent = Math.floor(t / (1000*60*60)) % 24;
  m.textContent = Math.floor(t / (1000*60)) % 60;
  s.textContent = Math.floor(t / 1000) % 60;
},1000);
const heroSection = document.querySelector(".hero");
const titleSection = document.querySelector(".title-section");
window.addEventListener("scroll", () => {
  const rect = hero.getBoundingClientRect();
  const fadeStart = 0;
  const fadeEnd = rect.height * 0.6;
  const progress = Math.min(
    Math.max(-rect.top - fadeStart, 0) / fadeEnd,
    1
  );
  video.style.opacity = 1 - progress;
});
