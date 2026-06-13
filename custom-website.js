const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");
    icon.className = navLinks.classList.contains("active")
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  });
}

const revealItems = document.querySelectorAll(
  ".solution-card, .show-box, .stack-card, .process-card, .price-card, details, .royal-strip, .contact-cta"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-show");
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach(item => {
  item.classList.add("reveal-hide");
  observer.observe(item);
});

const systemPanel = document.querySelector(".system-panel");

document.addEventListener("mousemove", e => {
  if (!systemPanel || window.innerWidth < 900) return;

  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  systemPanel.style.transform = `translate(${x}px, ${y}px)`;
});

document.querySelectorAll("details").forEach(item => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll("details").forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active-link");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active-link");
    }
  });
});

document.querySelectorAll(".node, .solution-card, .stack-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

console.log("Custom Website Demo Loaded Successfully 👑");