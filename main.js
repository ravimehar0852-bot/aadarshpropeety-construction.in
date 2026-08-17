// ============================================
// AADARSH PROPERTY AND BUILDERS - Shared JS
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // ---- Mobile nav toggle ----
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".nav-overlay");

  function closeNav() {
    hamburger?.classList.remove("open");
    navLinks?.classList.remove("open");
    overlay?.classList.remove("open");
    document.body.style.overflow = "";
  }
  function openNav() {
    hamburger?.classList.add("open");
    navLinks?.classList.add("open");
    overlay?.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  hamburger?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.contains("open");
    isOpen ? closeNav() : openNav();
  });
  overlay?.addEventListener("click", closeNav);
  navLinks?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));

  // ---- Highlight active nav link ----
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in-view"));
  }

  // ---- Footer year ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Populate WhatsApp / phone links dynamically where data attributes are used ----
  document.querySelectorAll("[data-wa]").forEach(el => {
    const msg = el.getAttribute("data-wa-msg") || "";
    el.setAttribute("href", waLink(msg));
  });
  document.querySelectorAll("[data-tel]").forEach(el => {
    el.setAttribute("href", telLink());
  });

  // ---- Contact form -> WhatsApp submit ----
  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("f-name")?.value || "";
      const phone = document.getElementById("f-phone")?.value || "";
      const interest = document.getElementById("f-interest")?.value || "";
      const message = document.getElementById("f-message")?.value || "";
      const text = `Hello, I am ${name} (${phone}). I am interested in: ${interest}. ${message}`;
      window.open(waLink(text), "_blank");
    });
  }

  // ---- "Show Our Project" PDF button (placeholder-safe) ----
  document.querySelectorAll(".show-project-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(CONFIG.projectPdf, "_blank");
    });
  });
});
