document.addEventListener("DOMContentLoaded", () => {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

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
  document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));
});
