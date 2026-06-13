const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const serviceDropdown = document.getElementById("serviceDropdown");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuBtn.querySelector("i").className = navMenu.classList.contains("active")
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  });
}

let dropdownTimer;

if (serviceDropdown) {
  const megaMenu = serviceDropdown.querySelector(".mega-menu");

  serviceDropdown.addEventListener("mouseenter", () => {
    clearTimeout(dropdownTimer);
    serviceDropdown.classList.add("open");
  });

  serviceDropdown.addEventListener("mouseleave", () => {
    dropdownTimer = setTimeout(() => {
      serviceDropdown.classList.remove("open");
    }, 450);
  });

  if (megaMenu) {
    megaMenu.addEventListener("mouseenter", () => {
      clearTimeout(dropdownTimer);
      serviceDropdown.classList.add("open");
    });

    megaMenu.addEventListener("mouseleave", () => {
      dropdownTimer = setTimeout(() => {
        serviceDropdown.classList.remove("open");
      }, 450);
    });
  }

  serviceDropdown.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      serviceDropdown.classList.toggle("open");
    }
  });
}

const revealItems = document.querySelectorAll(
  ".site-card, .demo-card, .feature-card, .process-card, .price-card, details, .brand-strip, .final-cta"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("reveal-show");
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach(item => {
  item.classList.add("reveal-hide");
  observer.observe(item);
});

const showcase = document.querySelector(".showcase-card");

document.addEventListener("mousemove", e => {
  if (!showcase || window.innerWidth < 900) return;

  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  showcase.style.transform = `translate(${x}px, ${y}px)`;
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