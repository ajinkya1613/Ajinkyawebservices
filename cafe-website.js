// ==========================
// MOBILE MENU
// ==========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    icon.className =
      navLinks.classList.contains("active")
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";

  });

}

// ==========================
// REVEAL ANIMATION
// ==========================

const revealItems = document.querySelectorAll(
  ".menu-card, .offer-card, .gallery-card, .review-card, .story-box, .hours-card, .location-card, .contact-cta"
);

const revealObserver =
new IntersectionObserver(

(entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add("reveal-show");

    }

  });

},

{
  threshold:0.15
}

);

revealItems.forEach(item=>{

  item.classList.add("reveal-hide");

  revealObserver.observe(item);

});

// ==========================
// FLOATING HERO CARD
// ==========================

const cafeCard =
document.querySelector(".cafe-card");

document.addEventListener("mousemove",(e)=>{

  if(!cafeCard || window.innerWidth < 900) return;

  const x =
  (window.innerWidth/2 - e.clientX)/45;

  const y =
  (window.innerHeight/2 - e.clientY)/45;

  cafeCard.style.transform =
  `translate(${x}px, ${y}px)`;

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

    if(
      link.getAttribute("href")
      === "#" + current
    ){

      link.classList.add(
        "active-link"
      );

    }

  });

});

// ==========================
// GALLERY HOVER EFFECT
// ==========================

document
.querySelectorAll(".gallery-card")
.forEach(card=>{

  card.addEventListener("mousemove",(e)=>{

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

  });

});

// ==========================
// MENU CARD HOVER
// ==========================

document
.querySelectorAll(".menu-card")
.forEach(card=>{

  card.addEventListener("mouseenter",()=>{

    card.style.transition =
    ".35s ease";

  });

});

// ==========================
// SMOOTH SCROLL
// ==========================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

  anchor.addEventListener("click",(e)=>{

    const target =
    document.querySelector(
      anchor.getAttribute("href")
    );

    if(target){

      e.preventDefault();

      target.scrollIntoView({
        behavior:"smooth"
      });

      navLinks.classList.remove(
        "active"
      );

    }

  });

});

// ==========================
// PAGE LOAD EFFECT
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
  "Cafe Website Demo Loaded Successfully ☕"
);