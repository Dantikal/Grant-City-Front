import { ROUTES } from "@/shared/constants/routes";

export const appConfig = {
  name: "Grand City",
  tagline: "Real Estate & Business Consulting",
  description:
    "Grand City & Business-Expert — a real-estate and business-consulting center in Bishkek, pairing independent valuation and analytics with hands-on property sales.",
  establishedYear: 2022,
  phone: "+996 (312) 00-00-00",
  email: "info@grandcity.kg",
  address: {
    street: "Bishkek",
    city: "Kyrgyzstan",
    region: "",
    postal: "",
  },
  social: [
    { label: "WhatsApp", href: "https://wa.me/99631200000" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  nav: [
    { label: "Properties", href: ROUTES.properties },
    { label: "Services", href: ROUTES.services },
    { label: "About", href: ROUTES.about },
    { label: "Agents", href: ROUTES.agents },
  ],
} as const;
