// ==========================
// MOBILE MENU
// ==========================

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

// ==========================
// SCROLL REVEAL
// ==========================

const revealElements = document.querySelectorAll(`
.service-card,
.why-card,
.process-card,
.case-card,
.price-card,
.about-box,
.timeline-item,
details,
.contact-cta
`.replace(/\n/g,""));

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add("reveal-show");

      }

    });

  },
  {
    threshold:0.15
  }
);

revealElements.forEach(el => {

  el.classList.add("reveal-hide");

  revealObserver.observe(el);

});

// ==========================
// FLOATING BUSINESS CARD
// ==========================

const businessCard =
document.querySelector(".business-card");

document.addEventListener("mousemove",(e)=>{

  if(!businessCard) return;

  if(window.innerWidth < 900) return;

  const x =
    (window.innerWidth / 2 - e.clientX) / 45;

  const y =
    (window.innerHeight / 2 - e.clientY) / 45;

  businessCard.style.transform =
    `translate(${x}px, ${y}px)`;

});

// ==========================
// COUNTER ANIMATION
// ==========================

const growthNumber =
document.querySelector(".growth-box h2");

if(growthNumber){

  const target =
  parseInt(
    growthNumber.innerText
    .replace("+","")
    .replace("%","")
  );

  let count = 0;

  const animateGrowth = () => {

    const speed =
    Math.ceil(target / 55);

    count += speed;

    if(count >= target){

      growthNumber.innerText =
      "+" + target + "%";

    }else{

      growthNumber.innerText =
      "+" + count + "%";

      requestAnimationFrame(
        animateGrowth
      );

    }

  };

  const growthObserver =
  new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

      if(entry.isIntersecting){

        animateGrowth();

        growthObserver.unobserve(
          entry.target
        );

      }

    });

  });

  growthObserver.observe(
    growthNumber
  );

}

// ==========================
// FAQ ACCORDION
// ==========================

const faqItems =
document.querySelectorAll("details");

faqItems.forEach(item => {

  item.addEventListener("toggle",()=>{

    if(item.open){

      faqItems.forEach(other=>{

        if(other !== item){

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

window.addEventListener("scroll",()=>{

  let current = "";

  sections.forEach(section=>{

    const sectionTop =
    section.offsetTop - 180;

    if(window.scrollY >= sectionTop){

      current =
      section.getAttribute("id");

    }

  });

  navItems.forEach(link=>{

    link.classList.remove(
      "active-link"
    );

    const href =
    link.getAttribute("href");

    if(
      href === "#" + current
    ){

      link.classList.add(
        "active-link"
      );

    }

  });

});

// ==========================
// CASE STUDY HOVER EFFECT
// ==========================

document.querySelectorAll(".case-card")
.forEach(card => {

  card.addEventListener(
    "mousemove",
    (e)=>{

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

    }
  );

});

// ==========================
// REPORT GRID COUNTUP
// ==========================

const reportNumbers =
document.querySelectorAll(
  ".report-grid h4"
);

reportNumbers.forEach(item=>{

  const text =
  item.innerText;

  const number =
  parseInt(text);

  if(isNaN(number)) return;

  let count = 0;

  const animate = ()=>{

    const speed =
    Math.ceil(number / 45);

    count += speed;

    if(count >= number){

      item.innerText = text;

    }else{

      item.innerText = count;

      requestAnimationFrame(
        animate
      );

    }

  };

  const observer =
  new IntersectionObserver(
    entries=>{

      entries.forEach(entry=>{

        if(entry.isIntersecting){

          animate();

          observer.unobserve(
            entry.target
          );

        }

      });

    }
  );

  observer.observe(item);

});

// ==========================
// SMOOTH LOAD
// ==========================

window.addEventListener("load",()=>{

  document.body.classList.add(
    "loaded"
  );

});

// ==========================
// CONSOLE
// ==========================

console.log(
  "Business Website Demo Loaded Successfully 🚀"
);