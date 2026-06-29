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

const basePrices = {
  "Personal Website": 499,
  "Business Website": 999,
  "Landing Page": 499,
  "Custom Website": 2499,
  "Website Redesign": 699,
  "Cafe / Restaurant Website": 999,
  "Real Estate Website": 1299,
  "Ecommerce Website": 2499
};

const addonData = {
  "Personal Website": [
    ["Resume Section", 99, "Education, skills and experience showcase"],
    ["Project Portfolio", 199, "Your work/projects with premium cards"],
    ["Social Links", 49, "Instagram, LinkedIn, GitHub buttons"],
    ["Contact Form", 149, "Direct enquiry form"],
    ["Download CV Button", 79, "Resume download CTA"],
    ["Basic SEO Setup", 299, "Google-ready page structure"]
  ],

  "Business Website": [
    ["WhatsApp / Call Button", 99, "Quick contact CTA"],
    ["Service Pages", 399, "Extra pages for services"],
    ["Testimonials Section", 149, "Trust-building reviews"],
    ["Google Map Embed", 99, "Location section"],
    ["Lead Form", 199, "Client enquiry form"],
    ["Basic SEO Setup", 399, "Search-friendly structure"]
  ],

  "Landing Page": [
    ["Strong CTA Section", 249, "Conversion-focused action block"],
    ["Offer Section", 199, "Highlight deals or packages"],
    ["Lead Form", 199, "Collect enquiries"],
    ["Testimonials", 149, "Social proof section"],
    ["FAQ Section", 129, "Answer common questions"],
    ["WhatsApp CTA", 99, "Instant contact button"]
  ],

  "Custom Website": [
    ["Dashboard UI", 999, "Admin-style interface"],
    ["Booking System", 799, "Appointments or reservations"],
    ["User Portal", 1199, "Login-based client area"],
    ["Premium Animations", 399, "Smooth scroll and hover effects"],
    ["Custom Forms", 299, "Advanced form fields"],
    ["Backend Ready Setup", 799, "API/backend structure"]
  ],

  "Website Redesign": [
    ["Hero Redesign", 199, "Premium first-screen design"],
    ["Mobile Optimization", 299, "Better phone/tablet layout"],
    ["CTA Improvement", 199, "Better conversion buttons"],
    ["Card Layout Upgrade", 249, "Modern content cards"],
    ["Speed Cleanup", 249, "Basic performance cleanup"],
    ["Trust Section", 149, "Badges, reviews, credibility"]
  ],

  "Cafe / Restaurant Website": [
    ["Menu Page", 299, "Food/drink menu layout"],
    ["Gallery Section", 199, "Food and interior photos"],
    ["Reservation Form", 399, "Booking enquiry form"],
    ["Opening Hours", 99, "Business hours section"],
    ["Google Map", 99, "Location embed"],
    ["WhatsApp Order Button", 149, "Quick order CTA"]
  ],

  "Real Estate Website": [
    ["Property Listings", 599, "Listing cards with details"],
    ["Property Gallery", 299, "Images and showcase"],
    ["Inquiry Form", 199, "Lead capture form"],
    ["Google Map", 99, "Area/location embed"],
    ["Featured Properties", 299, "Premium listing section"],
    ["WhatsApp Lead Button", 149, "Direct buyer/seller enquiry"]
  ],

  "Ecommerce Website": [
    ["Product Pages", 499, "Product detail layouts"],
    ["Cart UI", 599, "Shopping cart interface"],
    ["Wishlist", 299, "Save products feature"],
    ["Product Filters", 249, "Category/price filters"],
    ["Checkout UI", 699, "Checkout page design"],
    ["WhatsApp Order", 149, "Order through WhatsApp"]
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
