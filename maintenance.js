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
  ".service-card, .process-card, .price-card, .why-card, details, .contact-cta"
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

const healthPanel = document.querySelector(".health-panel");

document.addEventListener("mousemove", e => {
  if (!healthPanel || window.innerWidth < 900) return;

  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  healthPanel.style.transform = `translate(${x}px, ${y}px)`;
});

const healthScore = document.querySelector(".health-score h2");

if (healthScore) {
  const target = parseInt(healthScore.innerText.replace("%", ""));
  let count = 0;

  const animateScore = () => {
    const speed = Math.ceil(target / 55);
    count += speed;

    if (count >= target) {
      healthScore.innerText = target + "%";
    } else {
      healthScore.innerText = count + "%";
      requestAnimationFrame(animateScore);
    }
  };

  const scoreObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateScore();
        scoreObserver.unobserve(entry.target);
      }
    });
  });

  scoreObserver.observe(healthScore);
}

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

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

console.log("Maintenance Demo Loaded Successfully 🛠️");