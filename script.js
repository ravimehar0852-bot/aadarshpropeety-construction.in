/* ============================================================
   AADARSH PROPERTY & BUILDERS — Shared Script
   ============================================================ */

const PHONE = "919414419786"; // WhatsApp format (no +, no leading 0)
const PHONE_DISPLAY = "+91 94144 19786";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initReveal();
  initWhatsAppLinks();
  initForms();
  initPropertyFilter();
  initFooterYear();
});

/* ---------- Sticky header shadow ---------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------- WhatsApp links (floating button, header, cards) ---------- */
function buildWhatsAppLink(message) {
  const text = encodeURIComponent(
    message || "Hello Aadarsh Property & Builders, I am interested in a property. Please share available options."
  );
  return `https://wa.me/${PHONE}?text=${text}`;
}

function initWhatsAppLinks() {
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const customMsg = el.getAttribute("data-wa-msg");
    el.setAttribute("href", buildWhatsAppLink(customMsg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  document.querySelectorAll("[data-call]").forEach((el) => {
    el.setAttribute("href", `tel:+${PHONE}`);
  });
}

/* ---------- Forms: Buy / Sell / Enquiry / Contact ---------- */
function initForms() {
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const type = form.getAttribute("data-form");
      const data = new FormData(form);
      const message = buildFormMessage(type, data);

      const successBox = form.parentElement.querySelector(".form-success");
      const waLink = successBox ? successBox.querySelector("[data-wa-submit]") : null;
      if (waLink) waLink.setAttribute("href", buildWhatsAppLink(message));

      if (successBox) {
        successBox.classList.add("show");
        successBox.setAttribute("tabindex", "-1");
        successBox.focus();
      }
      form.reset();
    });
  });
}

function buildFormMessage(type, data) {
  const get = (key) => (data.get(key) || "").toString().trim();
  if (type === "buy") {
    return `Hello Aadarsh Property & Builders, I am looking to buy a property.\nName: ${get("name")}\nPhone: ${get("phone")}\nLocation: ${get("location")}\nProperty Type: ${get("propertyType")}\nBudget: ${get("budget")}\nRequirement: ${get("requirement")}`;
  }
  if (type === "sell") {
    return `Hello Aadarsh Property & Builders, I want to sell my property.\nOwner Name: ${get("ownerName")}\nPhone: ${get("phone")}\nProperty Type: ${get("propertyType")}\nLocation: ${get("location")}\nArea: ${get("area")}\nExpected Price: ${get("price")}\nDetails: ${get("details")}`;
  }
  if (type === "enquiry") {
    return `Hello Aadarsh Property & Builders, I have a property enquiry.\nName: ${get("name")}\nPhone: ${get("phone")}\nPreferred Location: ${get("location")}\nProperty Type: ${get("propertyType")}\nBudget: ${get("budget")}\nBuy/Sell: ${get("purpose")}\nMessage: ${get("message")}`;
  }
  if (type === "contact") {
    return `Hello Aadarsh Property & Builders, I would like to get in touch.\nName: ${get("name")}\nPhone: ${get("phone")}\nEmail: ${get("email")}\nRequirement: ${get("requirement")}\nLocation: ${get("location")}\nMessage: ${get("message")}`;
  }
  return "Hello Aadarsh Property & Builders, I am interested in a property.";
}

/* ---------- Search box (home) — redirects to properties.html with query params ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("[data-search-form]");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(searchForm);
      const params = new URLSearchParams();
      ["location", "propertyType", "purpose", "budget"].forEach((key) => {
        const val = data.get(key);
        if (val) params.set(key, val);
      });
      window.location.href = `properties.html?${params.toString()}`;
    });
  }
});

/* ---------- Property filter (properties.html) ---------- */
function initPropertyFilter() {
  const filterBar = document.querySelector("[data-filter-bar]");
  const cards = document.querySelectorAll("[data-property-card]");
  if (!filterBar || !cards.length) return;

  const locationSelect = filterBar.querySelector('[name="location"]');
  const typeSelect = filterBar.querySelector('[name="propertyType"]');
  const purposeSelect = filterBar.querySelector('[name="purpose"]');
  const statusSelect = filterBar.querySelector('[name="status"]');
  const resultsCount = document.querySelector("[data-results-count]");
  const noResults = document.querySelector("[data-no-results]");

  // Pre-fill from URL params (coming from home search box)
  const urlParams = new URLSearchParams(window.location.search);
  if (locationSelect && urlParams.get("location")) locationSelect.value = urlParams.get("location");
  if (typeSelect && urlParams.get("propertyType")) typeSelect.value = urlParams.get("propertyType");
  if (purposeSelect && urlParams.get("purpose")) purposeSelect.value = urlParams.get("purpose");

  function applyFilters() {
    const loc = locationSelect ? locationSelect.value : "";
    const type = typeSelect ? typeSelect.value : "";
    const purpose = purposeSelect ? purposeSelect.value : "";
    const status = statusSelect ? statusSelect.value : "";
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesLoc = !loc || card.dataset.location === loc;
      const matchesType = !type || card.dataset.type === type;
      const matchesPurpose = !purpose || card.dataset.purpose === purpose;
      const matchesStatus = !status || card.dataset.status === status;
      const visible = matchesLoc && matchesType && matchesPurpose && matchesStatus;
      card.style.display = visible ? "" : "none";
      if (visible) visibleCount++;
    });

    if (resultsCount) resultsCount.textContent = `${visibleCount} propert${visibleCount === 1 ? "y" : "ies"} found`;
    if (noResults) noResults.classList.toggle("show", visibleCount === 0);
  }

  filterBar.addEventListener("change", applyFilters);
  applyFilters();
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = new Date().getFullYear();
}
