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
  /** `label` names the network (and picks the icon); `handle` tells apart two accounts
   *  on the same network; `primary` links stay in the header even when it is tight. */
  social: [
    { label: "WhatsApp", handle: "+996 551 211 209", href: "https://wa.me/996551211209", primary: true },
    { label: "Instagram", handle: "@bizness.expert", href: "https://www.instagram.com/bizness.expert/", primary: true },
    { label: "Instagram", handle: "@maria_nirenberg", href: "https://www.instagram.com/maria_nirenberg/", primary: true },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ] as { label: string; handle?: string; href: string; primary?: boolean }[],
  nav: [
    { label: "Properties", href: ROUTES.properties },
    { label: "Services", href: ROUTES.services },
    { label: "About", href: ROUTES.about },
    { label: "Agents", href: ROUTES.agents },
  ],
} as const;
