// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {
      icon.className = "fa-solid fa-xmark";
    } else {
      icon.className = "fa-solid fa-bars";
    }

  });
}

// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(`
  .about-card,
  .skill-card,
  .service-card,
  .project-card,
  .timeline-item,
  .testimonial-card,
  .contact-cta
`.replace(/\n/g, ""));

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-show");
      }

    });

  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => {

  el.classList.add("reveal-hide");

  revealObserver.observe(el);

});

// =========================
// PROFILE CARD FLOAT EFFECT
// =========================

const profileCard = document.querySelector(".profile-card");

document.addEventListener("mousemove", (e) => {

  if (!profileCard) return;

  if (window.innerWidth < 900) return;

  const x =
    (window.innerWidth / 2 - e.clientX) / 45;

  const y =
    (window.innerHeight / 2 - e.clientY) / 45;

  profileCard.style.transform =
    `translate(${x}px, ${y}px)`;

});

// =========================
// HERO STATS COUNTER
// =========================

const stats = document.querySelectorAll(".hero-stats strong");

stats.forEach(stat => {

  const text = stat.innerText;

  const number = parseInt(text);

  if (isNaN(number)) return;

  let count = 0;

  const animateCounter = () => {

    const speed = Math.ceil(number / 50);

    count += speed;

    if (count >= number) {

      stat.innerText = text;

    } else {

      if (text.includes("+")) {
        stat.innerText = count + "+";
      }
      else if (text.includes("%")) {
        stat.innerText = count + "%";
      }
      else {
        stat.innerText = count;
      }

      requestAnimationFrame(animateCounter);

    }

  };

  const counterObserver =
    new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          animateCounter();

          counterObserver.unobserve(entry.target);

        }

      });

    });

  counterObserver.observe(stat);

});

// =========================
// FAQ SUPPORT
// =========================

document.querySelectorAll("details").forEach(item => {

  item.addEventListener("toggle", () => {

    if (item.open) {

      document.querySelectorAll("details").forEach(other => {

        if (other !== item) {
          other.open = false;
        }

      });

    }

  });

});

// =========================
// PROJECT CARD HOVER
// =========================

document.querySelectorAll(".project-card")
.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect =
      card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    card.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    card.style.setProperty(
      "--mouse-y",
      `${y}px`
    );

  });

});

// =========================
// ACTIVE NAV LINK
// =========================

const sections =
  document.querySelectorAll("section");

const navItems =
  document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {

      current =
        section.getAttribute("id");

    }

  });

  navItems.forEach(link => {

    link.classList.remove("active-link");

    const href =
      link.getAttribute("href");

    if (href === "#" + current) {

      link.classList.add("active-link");

    }

  });

});

// =========================
// SMOOTH LOAD EFFECT
// =========================

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});

// =========================
// CONSOLE
// =========================

console.log(
  "Personal Website Demo Loaded Successfully 🚀"
);