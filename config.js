// ============================================
// AADARSH PROPERTY AND BUILDERS - SITE CONFIG
// Central place to update contact info, links, etc.
// ============================================

const CONFIG = {
  business: {
    name: "Aadarsh Property and Builders",
    tagline: "Your Trusted Real Estate Guide",
    owner: "Sharif Mohammed",
    established: "2010",
    rating: "5.0",
    reviewCount: "30",
    address: "Near Borkheda Police Station, Baran Road, Borkhera, Kota, Rajasthan 325201",
    mapEmbedUrl: "https://www.google.com/maps?q=Aadarsh+Property+and+Builders+Borkheda+Kota&output=embed",
    mapLink: "https://maps.app.goo.gl/",
  },
  contact: {
    phone: "+919414419786",
    phoneDisplay: "094144 19786",
    whatsapp: "919414419786",
    railVihar: "9057560338",
    villaEnquiry: "8829813285",
  },
  social: {
    instagram: "https://instagram.com/aadarshproperties786",
    facebook: "#",
  },
  projectPdf: "Aadarsh_Villa_Brochure.pdf", // replace later when user provides final PDF
  nav: [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Services", href: "services.html" },
    { label: "Aadarsh Villa", href: "aadarsh-villa.html" },
    { label: "Rail Vihar", href: "rail-vihar.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "Reviews", href: "testimonials.html" },
    { label: "Contact", href: "contact.html" },
  ],
};

// Helper: build a WhatsApp deep link with prefilled message
function waLink(message) {
  const msg = encodeURIComponent(message || "Hello, I am interested in your properties.");
  return `https://wa.me/${CONFIG.contact.whatsapp}?text=${msg}`;
}

// Helper: build a tel: link
function telLink() {
  return `tel:${CONFIG.contact.phone}`;
}
