const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.onclick = () => {
    navMenu.classList.toggle("active");
  };
}

document.querySelectorAll(".dropdown > button").forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const parent = btn.closest(".dropdown");
    parent.classList.toggle("open");
  };
});

document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown").forEach((drop) => {
    if (!drop.contains(e.target)) {
      drop.classList.remove("open");
    }
  });
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.12
});

reveals.forEach((el) => observer.observe(el));

const whatsappNumber = "917507711464";
// yaha apna WhatsApp number daal

const whatsappFloat = document.getElementById("whatsappFloat");

if (whatsappFloat) {
  whatsappFloat.href =
    `https://wa.me/${whatsappNumber}?text=Hi Ajinkya Web Services, I want a website for my business.`;
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const business = document.getElementById("business").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    const text =
      `Hi Ajinkya Web Services,%0A%0AName: ${name}%0ABusiness: ${business}%0AService: ${service}%0AMessage: ${message}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${text}`,
      "_blank"
    );
  });
}
const addonData = {
  "Personal Website": [
    ["Resume Download Button", 800, "PDF resume download button"],
    ["Portfolio Projects", 1500, "Project showcase section"],
    ["Skills Section", 1200, "Skills and tools display"],
    ["Social Links", 700, "Instagram, GitHub, LinkedIn"],
    ["Blog Section", 2500, "Personal blog layout"]
  ],

  "Business Website": [
    ["Google Map", 800, "Business location map"],
    ["Gallery Section", 1200, "Business photos section"],
    ["Customer Reviews", 1000, "Testimonials section"],
    ["Pricing Table", 1500, "Service packages table"],
    ["WhatsApp Booking", 1500, "Direct booking/enquiry flow"],
    ["Offer Banner", 1000, "Discount or festival banner"]
  ],

  "E-commerce Website": [
    ["Product Categories", 1500, "Extra category sections"],
    ["Product Filter UI", 2500, "Filter and sorting layout"],
    ["Offer Banner", 1200, "Sale/discount banner"],
    ["Cart Style Layout", 3000, "Cart-like order flow"],
    ["WhatsApp Order Flow", 1800, "Product enquiry to WhatsApp"],
    ["Delivery Info", 1000, "Delivery/payment info section"]
  ],

  "Landing Page": [
    ["Countdown Timer", 1200, "Offer countdown section"],
    ["Lead Form", 1500, "Enquiry capture form"],
    ["Testimonials", 1000, "Social proof section"],
    ["FAQ Section", 800, "Question-answer section"],
    ["Pricing Block", 1000, "Offer pricing section"],
    ["Ad-ready CTA Flow", 2000, "Conversion focused CTA"]
  ],

  "Custom Website": [
    ["Custom Dashboard UI", 5000, "Stats/dashboard style sections"],
    ["Advanced Form", 2500, "Custom enquiry or booking form"],
    ["Interactive Cards", 2000, "Animated feature cards"],
    ["Multi-page Setup", 5000, "Extra custom pages"],
    ["API Ready Layout", 7000, "Frontend ready for backend/API"],
    ["Admin Panel UI", 8000, "Admin dashboard style UI"]
  ],

  "Website Redesign": [
    ["Hero Redesign", 1500, "Modern top section"],
    ["Mobile Fix", 2500, "Responsive layout improvements"],
    ["CTA Improvement", 1000, "Better buttons and enquiry flow"],
    ["Full UI Polish", 5000, "Spacing, typography and cards"],
    ["Before/After Section", 1500, "Comparison section"],
    ["Speed Cleanup", 2000, "Basic frontend cleanup"]
  ],

  "Maintenance": [
    ["Extra Content Updates", 700, "More monthly changes"],
    ["Offer Banner Update", 800, "Monthly offer/banner changes"],
    ["Gallery Update", 1000, "Photo/gallery updates"],
    ["Priority Support", 1500, "Faster support"],
    ["Monthly Website Check", 1000, "Basic site check"],
    ["Backup Guidance", 1000, "Basic backup help"]
  ],

  "SEO Setup": [
    ["Extra Page SEO", 700, "SEO for extra page"],
    ["Local SEO Text", 1500, "Location/service area text"],
    ["Image Alt Text", 1000, "Image SEO labels"],
    ["Keyword Content Polish", 2500, "Better keyword placement"],
    ["Google Business Guidance", 1500, "Basic business profile help"],
    ["SEO Audit Notes", 2000, "Improvement checklist"]
  ],

  "Hosting Help": [
    ["Domain Connection", 1000, "DNS/domain connect help"],
    ["SSL Basic Check", 800, "HTTPS basic check"],
    ["Website Deployment", 1500, "Upload/deploy help"],
    ["Migration Help", 2500, "Move website setup"],
    ["Email Setup Guidance", 1500, "Business email guidance"],
    ["Post Launch Check", 1000, "Mobile/desktop live check"]
  ]
};

const advancedForm = document.getElementById("advancedContactForm");

if (advancedForm) {
  const websiteType = document.getElementById("websiteType");
  const addonsGrid = document.getElementById("addonsGrid");
  const addonHint = document.getElementById("addonHint");
  const estimateTotal = document.getElementById("estimateTotal");
  const summaryType = document.getElementById("summaryType");
  const summaryPackage = document.getElementById("summaryPackage");
  const summaryAddons = document.getElementById("summaryAddons");

  function formatPrice(num) {
    return "₹" + Number(num).toLocaleString("en-IN");
  }

  function renderAddons() {
    const selected = websiteType.value;
    addonsGrid.innerHTML = "";

    if (!selected || !addonData[selected]) {
      addonHint.textContent = "Select service to see addons.";
      calculateEstimate();
      return;
    }

    addonHint.textContent = selected + " ke liye addons:";

    addonData[selected].forEach(([name, price, desc]) => {
      const label = document.createElement("label");
      label.className = "addon-card";
      label.innerHTML = `
        <input type="checkbox" class="addon" value="${name}" data-price="${price}">
        <div>
          <strong>${name}</strong>
          <small>${desc}</small>
          <b>+ ${formatPrice(price)}</b>
        </div>
      `;
      addonsGrid.appendChild(label);
    });

    document.querySelectorAll(".addon").forEach(addon => {
      addon.addEventListener("change", calculateEstimate);
    });

    calculateEstimate();
  }

  function calculateEstimate() {
    const selectedOption = websiteType.options[websiteType.selectedIndex];
    const basePrice = Number(selectedOption.dataset.price || 0);

    const selectedPackage = document.querySelector('input[name="package"]:checked');
    const packagePrice = Number(selectedPackage.dataset.price || 0);

    const addons = [...document.querySelectorAll(".addon:checked")];
    const addonTotal = addons.reduce((sum, addon) => {
      return sum + Number(addon.dataset.price || 0);
    }, 0);

    const total = basePrice + packagePrice + addonTotal;

    estimateTotal.textContent = formatPrice(total);
    summaryType.textContent = websiteType.value || "Not selected";
    summaryPackage.textContent = selectedPackage.value;

    summaryAddons.innerHTML = "";

    if (addons.length === 0) {
      summaryAddons.innerHTML = "<li>No addons selected</li>";
    } else {
      addons.forEach(addon => {
        const li = document.createElement("li");
        li.textContent = `${addon.value} - ${formatPrice(addon.dataset.price)}`;
        summaryAddons.appendChild(li);
      });
    }

    return { total, addons, selectedPackage };
  }

  websiteType.addEventListener("change", renderAddons);

  document.querySelectorAll('input[name="package"]').forEach(input => {
    input.addEventListener("change", calculateEstimate);
  });

  renderAddons();

  advancedForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const result = calculateEstimate();

    const name = document.getElementById("clientName").value.trim();
    const business = document.getElementById("businessName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const city = document.getElementById("clientCity").value.trim();
    const message = document.getElementById("projectMessage").value.trim();
    const reference = document.getElementById("referenceWebsite").value.trim();
    const timeline = document.getElementById("timeline").value;
    const urgency = document.getElementById("urgency")?.value || "Normal";

    const addonsText = result.addons.length
      ? result.addons.map(a => `✓ ${a.value}: ${formatPrice(a.dataset.price)}`).join("\n")
      : "No addons selected";

    const finalText =
`🚀 NEW WEBSITE ORDER

Client Name: ${name}
Business / Project: ${business}
Client Phone: ${phone}
City: ${city || "Not provided"}

Website / Service:
${websiteType.value}

Package:
${result.selectedPackage.value}

Selected Addons:
${addonsText}

Estimated Total:
${formatPrice(result.total)}

Timeline:
${timeline}

Urgency:
${urgency}

Reference Website:
${reference || "Not provided"}

Project Details:
${message}

Please review and confirm final price.`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalText)}`,
      "_blank"
    );
  });
}