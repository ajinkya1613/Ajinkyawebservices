
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if(menuBtn && nav){
  menuBtn.addEventListener("click",()=>nav.classList.toggle("active"));
}
const qty = document.getElementById("qty");
if(qty){
  document.querySelectorAll("[data-qty]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      let value = Number(qty.value) + Number(btn.dataset.qty);
      if(value < 1) value = 1;
      qty.value = value;
    });
  });
}
document.querySelectorAll("[data-filter]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const filter = btn.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card=>{
      card.style.display = filter === "all" || card.dataset.cat === filter ? "block" : "none";
    });
  });
});
