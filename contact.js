const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = menuBtn.querySelector("i");
    icon.className = navMenu.classList.contains("active")
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  });
}

const addonData = {
  "Personal Website": [
    ["Resume Section", 499, "Education, skills and experience showcase"],
    ["Project Portfolio", 999, "Your work/projects with cards"],
    ["Social Links", 299, "Instagram, LinkedIn, GitHub buttons"],
    ["Contact Form", 999, "Direct enquiry section"],
    ["Download CV Button", 499, "Resume download CTA"],
    ["SEO Setup", 1999, "Basic Google-ready structure"]
  ],
  "Business Website": [
    ["WhatsApp Button", 499, "Direct customer enquiry"],
    ["Service Pages", 1999, "Separate pages for services"],
    ["Testimonials", 799, "Trust-building client reviews"],
    ["Google Map", 499, "Location section"],
    ["Contact Form", 999, "Lead collection form"],
    ["SEO Setup", 1999, "Search-friendly page setup"]
  ],
  "Landing Page": [
    ["Strong CTA Sections", 1499, "Conversion-focused buttons"],
    ["Offer Section", 999, "Pricing or limited-time offer"],
    ["Lead Form", 999, "Collect customer details"],
    ["Testimonials", 799, "Social proof"],
    ["FAQ Section", 699, "Remove customer doubts"],
    ["WhatsApp CTA", 499, "Direct message flow"]
  ],
  "Custom Website": [
    ["Dashboard UI", 4999, "Admin/client dashboard layout"],
    ["Booking System", 3999, "Appointment or slot booking flow"],
    ["User Portal", 4999, "Client/user login-style pages"],
    ["Advanced Animations", 1999, "Premium interactive effects"],
    ["Custom Forms", 1499, "Special enquiry or data forms"],
    ["Backend Ready Structure", 2999, "Future backend integration layout"]
  ],
  "Website Redesign": [
    ["Hero Redesign", 999, "Modern first impression"],
    ["Mobile Fixes", 1499, "Responsive layout improvement"],
    ["CTA Improvement", 999, "Better contact flow"],
    ["Card Redesign", 1499, "Modern sections and spacing"],
    ["Speed Cleanup", 999, "Lightweight structure"],
    ["Trust Sections", 799, "Reviews, process, portfolio"]
  ],
  "Cafe / Restaurant Website": [
    ["Menu Page", 1499, "Food/drink menu with prices"],
    ["Gallery Page", 999, "Cafe/restaurant photos"],
    ["Reservation Form", 1999, "Table booking enquiry"],
    ["Opening Hours", 499, "Business timings section"],
    ["Google Map", 499, "Location section"],
    ["WhatsApp Order CTA", 799, "Direct order/contact button"]
  ],
  "Real Estate Website": [
    ["Property Listings", 2999, "Property cards with details"],
    ["Gallery", 1499, "Property images"],
    ["Inquiry Form", 999, "Lead collection"],
    ["Map Location", 499, "Property location"],
    ["Featured Properties", 1499, "Premium listings"],
    ["WhatsApp Lead Button", 799, "Direct buyer enquiry"]
  ],
  "Ecommerce Website": [
    ["Product Cards", 1999, "Product showcase grid"],
    ["Cart UI", 2499, "Shopping cart interface"],
    ["Wishlist", 1499, "Save product option"],
    ["Category Filters", 999, "Product filtering layout"],
    ["Checkout UI", 2999, "Order flow design"],
    ["WhatsApp Order Button", 799, "Direct order enquiry"]
  ]
};

const priceMap = {
  "Personal Website": 6000,
  "Business Website": 14999,
  "Landing Page": 4999,
  "Custom Website": 12000,
  "Website Redesign": 4999,
  "Cafe / Restaurant Website": 14999,
  "Real Estate Website": 14999,
  "Ecommerce Website": 24999
};

const dynamicAddons = document.getElementById("dynamicAddons");
const addonNote = document.getElementById("addonNote");

const summaryType = document.getElementById("summaryType");
const summaryBudget = document.getElementById("summaryBudget");
const summaryTimeline = document.getElementById("summaryTimeline");
const estimatePrice = document.getElementById("estimatePrice");
const selectedAddonsBox = document.getElementById("selectedAddons");

const budget = document.getElementById("budget");
const timeline = document.getElementById("timeline");
const sendBtn = document.getElementById("sendWhatsapp");

function getSelectedWebsiteType() {
  const selected = document.querySelector('input[name="websiteType"]:checked');
  return selected ? selected.value : "";
}

function renderAddons(type) {
  dynamicAddons.innerHTML = "";

  if (!type) {
    addonNote.textContent = "Pehle website type select karo, uske hisaab se add-ons show honge.";
    selectedAddonsBox.innerHTML = "No add-ons selected";
    return;
  }

  addonNote.textContent = `${type} ke liye recommended add-ons:`;

  addonData[type].forEach(addon => {
    const label = document.createElement("label");
    label.className = "addon-card";

    label.innerHTML = `
      <input type="checkbox" value="${addon[0]}" data-price="${addon[1]}">
      <span>
        <b>${addon[0]}</b>
        <small>+₹${addon[1].toLocaleString()}</small>
        <small>${addon[2]}</small>
      </span>
    `;

    dynamicAddons.appendChild(label);
  });

  document.querySelectorAll("#dynamicAddons input").forEach(item => {
    item.addEventListener("change", updateSummary);
  });
}

function getSelectedAddons() {
  return [...document.querySelectorAll("#dynamicAddons input:checked")].map(item => ({
    name: item.value,
    price: parseInt(item.dataset.price)
  }));
}

function updateSummary() {
  const type = getSelectedWebsiteType();

  summaryType.textContent = type || "Not selected";
  summaryBudget.textContent = budget.value || "Not selected";
  summaryTimeline.textContent = timeline.value || "Not selected";

  let total = priceMap[type] || 4999;
  const selectedAddons = getSelectedAddons();

  selectedAddonsBox.innerHTML = "";

  if (selectedAddons.length === 0) {
    selectedAddonsBox.innerHTML = "No add-ons selected";
  } else {
    selectedAddons.forEach(addon => {
      total += addon.price;

      selectedAddonsBox.innerHTML += `
        <div class="summary-addon">
          <span>${addon.name}</span>
          <strong>+₹${addon.price.toLocaleString()}</strong>
        </div>
      `;
    });
  }

  estimatePrice.textContent = "₹" + total.toLocaleString();
}

document.querySelectorAll('input[name="websiteType"]').forEach(item => {
  item.addEventListener("change", () => {
    const type = getSelectedWebsiteType();
    renderAddons(type);
    updateSummary();
  });
});

budget.addEventListener("change", updateSummary);
timeline.addEventListener("change", updateSummary);

sendBtn.addEventListener("click", () => {
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const brand = document.getElementById("brandName").value.trim();
  const type = getSelectedWebsiteType();
  const addons = getSelectedAddons();
  const details = document.getElementById("message").value.trim();

  if (!name || !phone || !type) {
    alert("Please fill Name, Phone and Website Type.");
    return;
  }

  const addonText = addons.length
    ? addons.map(addon => `${addon.name} (+₹${addon.price.toLocaleString()})`).join(", ")
    : "None selected";

  const whatsappMessage =
`Hello Ajinkya,

I want to build a website.

Name: ${name}
Phone: ${phone}
Business / Brand: ${brand || "Not added"}

Website Type: ${type}
Budget: ${budget.value || "Not selected"}
Timeline: ${timeline.value || "Not selected"}

Selected Add-ons:
${addonText}

Project Details:
${details || "Not added"}

Estimated Total:
${estimatePrice.textContent}`;

  const whatsappNumber = "917507711646";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(url, "_blank");
});

updateSummary();