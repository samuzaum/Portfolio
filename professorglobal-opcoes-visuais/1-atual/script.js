// Vanilla JS re-implementando as mesmas animações do componente React original:
// starfield, equações voando, reveal-on-scroll, count-up, parallax no mascote.
document.addEventListener("DOMContentLoaded", () => {
  const scope = document;

  // starfield
  const cStars = scope.querySelector("#eq-stars");
  if (cStars) {
    const x = cStars.getContext("2d");
    let s = [];
    const size = () => {
      cStars.width = innerWidth; cStars.height = innerHeight; s = [];
      const n = Math.min(160, (innerWidth / 9) | 0);
      for (let i = 0; i < n; i++) s.push({ x: Math.random() * cStars.width, y: Math.random() * cStars.height, r: Math.random() * 1.4 + .2, t: Math.random() * 6.28, sp: Math.random() * .02 + .005 });
    };
    const draw = () => {
      x.clearRect(0, 0, cStars.width, cStars.height);
      for (const p of s) { p.t += p.sp; const a = .4 + Math.sin(p.t) * .5; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.28); x.fillStyle = "rgba(255,255,255," + Math.max(0, a) + ")"; x.fill(); }
      requestAnimationFrame(draw);
    };
    size(); draw(); addEventListener("resize", size);
  }

  // flying equations
  const cEq = scope.querySelector("#eq-eqs");
  if (cEq) {
    const x = cEq.getContext("2d");
    const eqs = ["E=mc²", "a²+b²=c²", "∫f(x)dx", "π", "√2", "∑", "Δ", "∞", "e^{iπ}+1=0", "f(x)", "λ", "θ", "x²", "dy/dx", "φ", "≈", "∂", "sin θ", "Σ", "αβγ"];
    let items = [];
    const mk = () => ({ t: eqs[(Math.random() * eqs.length) | 0], x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .35, vy: -(.15 + Math.random() * .4), s: 12 + Math.random() * 26, a: .05 + Math.random() * .22, rot: (Math.random() - .5) * .6 });
    const size = () => { cEq.width = innerWidth; cEq.height = innerHeight; const n = Math.min(26, (innerWidth / 60) | 0); items = []; for (let i = 0; i < n; i++) items.push(mk()); };
    const draw = () => {
      x.clearRect(0, 0, cEq.width, cEq.height);
      for (const it of items) {
        it.x += it.vx; it.y += it.vy; it.rot += .002;
        if (it.y < -40) { it.y = innerHeight + 30; it.x = Math.random() * innerWidth; }
        x.save(); x.translate(it.x, it.y); x.rotate(it.rot);
        x.font = "600 " + it.s + 'px "Space Grotesk", sans-serif';
        const g = x.createLinearGradient(-30, -10, 30, 10);
        g.addColorStop(0, "rgba(0,224,194," + it.a + ")");
        g.addColorStop(1, "rgba(139,124,246," + it.a + ")");
        x.fillStyle = g; x.fillText(it.t, 0, 0); x.restore();
      }
      requestAnimationFrame(draw);
    };
    size(); draw(); addEventListener("resize", size);
  }

  // reveal on scroll
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
  scope.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // count up
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target; const to = +(el.dataset.count || "0");
    let n = 0; const step = Math.max(1, to / 60);
    const t = setInterval(() => {
      n += step;
      if (n >= to) { n = to; clearInterval(t); }
      el.textContent = (to >= 1000 ? Math.floor(n).toLocaleString("pt-BR") : Math.floor(n)) + (to === 100 ? "" : to >= 1000 ? "+" : "");
    }, 18);
    cio.unobserve(el);
  }), { threshold: .6 });
  scope.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

  // parallax
  const svg = scope.querySelector(".genius svg");
  addEventListener("mousemove", (e) => {
    if (innerWidth < 900 || !svg) return;
    const dx = e.clientX / innerWidth - .5, dy = e.clientY / innerHeight - .5;
    svg.style.transform = `translate(${dx * 18}px,${dy * 14}px)`;
  });
});
