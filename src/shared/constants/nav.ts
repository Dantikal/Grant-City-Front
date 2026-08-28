import { ROUTES } from "./routes";

/** Primary navigation. Shared by the header, the mobile menu and the homepage
 *  shortcut index — `desc` is only used by the latter. */
export const NAV_ITEMS = [
  { key: "nav.home", desc: "navDesc.home", href: ROUTES.home },
  { key: "nav.properties", desc: "navDesc.properties", href: ROUTES.properties },
  { key: "nav.services", desc: "navDesc.services", href: ROUTES.services },
  { key: "nav.about", desc: "navDesc.about", href: ROUTES.about },
  { key: "nav.agents", desc: "navDesc.agents", href: ROUTES.agents },
  { key: "nav.contact", desc: "navDesc.contact", href: ROUTES.contacts },
] as const;
