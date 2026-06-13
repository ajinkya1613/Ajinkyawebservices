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
  ".audit-card, .service-card, .strategy-box, .result-card, .price-card, details, .seo-strip, .contact-cta"
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

const rankingPanel = document.querySelector(".ranking-panel");

document.addEventListener("mousemove", e => {
  if (!rankingPanel || window.innerWidth < 900) return;

  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  rankingPanel.style.transform = `translate(${x}px, ${y}px)`;
});

const seoScore = document.querySelector(".seo-score h2");

if (seoScore) {
  const target = parseInt(seoScore.innerText.replace("%", ""));
  let count = 0;

  const animateScore = () => {
    const speed = Math.ceil(target / 55);
    count += speed;

    if (count >= target) {
      seoScore.innerText = target + "%";
    } else {
      seoScore.innerText = count + "%";
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

  scoreObserver.observe(seoScore);
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

console.log("SEO Setup Demo Loaded Successfully 📈");