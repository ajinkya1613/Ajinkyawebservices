
const btn=document.getElementById("estateMenuBtn");
const nav=document.getElementById("estateNav");
if(btn&&nav){btn.addEventListener("click",()=>nav.classList.toggle("active"))}

document.querySelectorAll("[data-filter]").forEach(button=>{
  button.addEventListener("click",()=>{
    const filter=button.dataset.filter;
    document.querySelectorAll(".property-card").forEach(card=>{
      card.style.display=(filter==="all"||card.dataset.type===filter)?"block":"none";
    });
  });
});
