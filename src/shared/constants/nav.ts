import { ROUTES } from "./routes";

/** Primary navigation, shared by the header and the mobile menu. Employees live
 *  under "About" (see its panel in NAV_MENUS) rather than as a top-level item. */
export const NAV_ITEMS = [
  { key: "nav.home", href: ROUTES.home },
  { key: "nav.properties", href: ROUTES.properties },
  { key: "nav.services", href: ROUTES.services },
  { key: "nav.about", href: ROUTES.about },
  { key: "nav.experience", href: ROUTES.experience },
  { key: "nav.contact", href: ROUTES.contacts },
] as const;

/** The six tiles under the homepage hero, in display order. */
export const SHORTCUT_ITEMS = [
  { key: "nav.services", desc: "navDesc.services", href: ROUTES.services },
  { key: "nav.properties", desc: "navDesc.properties", href: ROUTES.properties },
  { key: "nav.about", desc: "navDesc.about", href: ROUTES.about },
  { key: "certs.title", desc: "navDesc.certificates", href: ROUTES.aboutCertificates },
  { key: "nav.agents", desc: "navDesc.agents", href: ROUTES.agents },
  { key: "nav.contact", desc: "navDesc.contact", href: ROUTES.contacts },
] as const;
