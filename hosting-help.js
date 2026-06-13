// ==========================
// MOBILE MENU
// ==========================

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

// ==========================
// REVEAL ANIMATION
// ==========================

const revealItems = document.querySelectorAll(
  ".service-card, .process-card, .platform-card, .price-card, details, .contact-cta"
);

const observer = new IntersectionObserver(
  entries => {
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

revealItems.forEach(item => {
  item.classList.add("reveal-hide");
  observer.observe(item);
});

// ==========================
// FLOATING DASHBOARD EFFECT
// ==========================

const deployPanel = document.querySelector(".deploy-panel");

document.addEventListener("mousemove", e => {

  if (!deployPanel || window.innerWidth < 900) return;

  const x =
    (window.innerWidth / 2 - e.clientX) / 45;

  const y =
    (window.innerHeight / 2 - e.clientY) / 45;

  deployPanel.style.transform =
    `translate(${x}px, ${y}px)`;

});

// ==========================
// LAUNCH COUNTER
// ==========================

const launchScore =
document.querySelector(".launch-status h2");

if (launchScore) {

  const target =
    parseInt(
      launchScore.innerText.replace("%", "")
    );

  let count = 0;

  const animateScore = () => {

    const speed =
      Math.ceil(target / 55);

    count += speed;

    if (count >= target) {

      launchScore.innerText =
        target + "%";

    } else {

      launchScore.innerText =
        count + "%";

      requestAnimationFrame(
        animateScore
      );
    }
  };

  const scoreObserver =
    new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          animateScore();

          scoreObserver.unobserve(
            entry.target
          );

        }

      });

    });

  scoreObserver.observe(launchScore);
}

// ==========================
// FAQ ACCORDION
// ==========================

document
.querySelectorAll("details")
.forEach(item => {

  item.addEventListener("toggle", () => {

    if (item.open) {

      document
      .querySelectorAll("details")
      .forEach(other => {

        if (other !== item) {
          other.open = false;
        }

      });

    }

  });

});

// ==========================
// ACTIVE NAVIGATION
// ==========================

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

    link.classList.remove(
      "active-link"
    );

    if (
      link.getAttribute("href")
      === "#" + current
    ) {
      link.classList.add(
        "active-link"
      );
    }

  });

});

// ==========================
// CARD HOVER GLOW
// ==========================

document
.querySelectorAll(
  ".service-card, .platform-card, .price-card"
)
.forEach(card => {

  card.addEventListener(
    "mousemove",
    e => {

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      card.style.setProperty(
        "--x",
        `${x}px`
      );

      card.style.setProperty(
        "--y",
        `${y}px`
      );

    }
  );

});

// ==========================
// PAGE LOAD
// ==========================

window.addEventListener("load", () => {

  document.body.classList.add(
    "loaded"
  );

});

// ==========================
// CONSOLE
// ==========================

console.log(
  "Hosting Help Demo Loaded Successfully 🚀"
);