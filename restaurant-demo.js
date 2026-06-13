const btn = document.getElementById("restMenuBtn");
const nav = document.getElementById("restNav");

if (btn && nav) {
  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}