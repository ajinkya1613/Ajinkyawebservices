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
  ".benefit-card, .split-card, .feature-card, .proof-card, .testimonial-card, .offer-box, details, .contact-cta"
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

const conversionCard = document.querySelector(".conversion-card");

document.addEventListener("mousemove", e => {
  if (!conversionCard || window.innerWidth < 900) return;

  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  conversionCard.style.transform = `translate(${x}px, ${y}px)`;
});

const conversionNumber = document.querySelector(".conversion-box h2");

if (conversionNumber) {
  const target = parseInt(conversionNumber.innerText.replace("+", "").replace("%", ""));
  let count = 0;

  const animateConversion = () => {
    const speed = Math.ceil(target / 55);
    count += speed;

    if (count >= target) {
      conversionNumber.innerText = "+" + target + "%";
    } else {
      conversionNumber.innerText = "+" + count + "%";
      requestAnimationFrame(animateConversion);
    }
  };

  const numberObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateConversion();
        numberObserver.unobserve(entry.target);
      }
    });
  });

  numberObserver.observe(conversionNumber);
}

document.querySelectorAll(".proof-card h2").forEach(item => {
  const original = item.innerText;
  const target = parseInt(original.replace("+", "").replace("%", "").replace("K", ""));

  if (isNaN(target)) return;

  let count = 0;

  const animate = () => {
    const speed = Math.ceil(target / 45);
    count += speed;

    if (count >= target) {
      item.innerText = original;
    } else {
      if (original.includes("K")) {
        item.innerText = count + "K+";
      } else if (original.includes("%")) {
        item.innerText = count + "%";
      } else {
        item.innerText = count;
      }

      requestAnimationFrame(animate);
    }
  };

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate();
        statObserver.unobserve(entry.target);
      }
    });
  });

  statObserver.observe(item);
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

document.querySelectorAll(".feature-card, .benefit-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

console.log("Landing Page Demo Loaded Successfully 🚀");