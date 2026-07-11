// ---------- Theme toggle ----------
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// ---------- Nav: scrolled state + burger ----------
(function () {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      links.classList.remove("open");
    })
  );
})();

// ---------- Scroll progress bar ----------
(function () {
  const bar = document.getElementById("scrollProgress");
  const update = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = scrolled + "%";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
})();

// ---------- Reveal on scroll ----------
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 40, 200) + "ms";
    io.observe(el);
  });
})();

// ---------- Animated stat counters ----------
(function () {
  const nums = document.querySelectorAll(".stat__num");
  const run = (el) => {
    const target = +el.dataset.count;
    const isDecimal = target % 1 !== 0;
    const dur = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = eased * target;
      el.textContent = isDecimal ? val.toFixed(1) : Math.round(val);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((n) => io.observe(n));
})();

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
