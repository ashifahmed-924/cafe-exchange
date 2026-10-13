export const business = {
  name: "Cafe Exchange",
  legalName: "Cafe Exchange (Dandenong South)",
  logoText: "CAFE EXCHANGE",
  subtitle: "DANDENONG SOUTH",
  tagline: "YOUR DAILY COFFEE ESCAPE.",
  description:
    "A fresh place to begin your morning, pause your workday and enjoy a really good coffee.",
  address: {
    street: "73 Portlink Drive",
    suburb: "Dandenong South",
    state: "VIC",
    postcode: "3175",
    country: "Australia",
    formatted: "73 Portlink Drive, Dandenong South VIC 3175, Australia",
  },
  phone: {
    display: "+61 421 225 958",
    tel: "tel:+61421225958",
  },
  /** Hours require owner confirmation before launch */
  hours: {
    weekday: "Monday–Friday: 5:00 am–3:00 pm",
    weekend: "Saturday–Sunday: Closed",
    note: "Hours awaiting final owner confirmation.",
    verified: false,
  },
  maps: {
    placeId: "ChIJ__SyY88R1moR7LHRijGU9ZI",
    url: "https://www.google.com/maps/place/?q=place_id:ChIJ__SyY88R1moR7LHRijGU9ZI",
    embed:
      "https://www.google.com/maps?q=73+Portlink+Drive,+Dandenong+South+VIC+3175&output=embed",
  },
  precinct: "Nexus Dandenong South",
  email: null, // No verified public email yet
  /** Replace hrefs with verified Cafe Exchange profile URLs before launch */
  social: [
    { id: "instagram", label: "Instagram", href: "#" },
    { id: "facebook", label: "Facebook", href: "#" },
    { id: "youtube", label: "YouTube", href: "#" },
    { id: "tiktok", label: "TikTok", href: "#" },
  ],
  nav: [
    { label: "HOME", href: "#home" },
    { label: "OUR STORY", href: "#story" },
    { label: "MENU", href: "#menu" },
    { label: "GALLERY", href: "#gallery" },
    { label: "REVIEWS", href: "#reviews" },
    { label: "VISIT US", href: "#visit" },
  ],
};
