import { ROUTES } from "./routes";

export interface NavMenuLink {
  /** Dictionary key for the label. */
  key: string;
  /** Dictionary key for the one-line description, if the panel shows one. */
  descKey?: string;
  href: string;
}

export interface NavMenu {
  links: NavMenuLink[];
  /** Append the `appConfig.social` links (plus WhatsApp) to the panel. */
  withSocial?: boolean;
  /** Dictionary key for a primary call-to-action rendered at the foot of the panel. */
  ctaKey?: string;
  ctaHref?: string;
}

/** Service slugs mirror `SERVICES` in the service entity — kept as literals here so
 *  `shared` does not reach up into `entities`. */
const SERVICE_SLUGS = ["buying", "selling", "letting", "management"] as const;

/** Hover panels for the header nav, keyed by the nav item's href. Every nav item
 *  in `NAV_ITEMS` that should open a panel needs an entry here. */
export const NAV_MENUS: Record<string, NavMenu> = {
  [ROUTES.home]: {
    links: [
      { key: "menu.home.featured", href: "/#featured" },
      { key: "menu.home.services", href: "/#services" },
      { key: "menu.home.agents", href: "/#agents" },
      { key: "menu.home.faq", href: "/#faq" },
    ],
  },

  [ROUTES.properties]: {
    links: [
      { key: "category.complex", href: `${ROUTES.properties}?category=complex` },
      { key: "category.home", href: `${ROUTES.properties}?category=home` },
      { key: "kind.land", href: `${ROUTES.properties}?kind=land` },
      { key: "properties.tabSale", href: ROUTES.propertiesBuy },
      { key: "properties.tabRent", href: ROUTES.propertiesRent },
    ],
  },

  [ROUTES.services]: {
    links: SERVICE_SLUGS.map((slug) => ({
      key: `svc.${slug}.title`,
      descKey: `svc.${slug}.short`,
      href: `${ROUTES.services}#${slug}`,
    })),
  },

  [ROUTES.about]: {
    links: [
      { key: "menu.about.founder", href: `${ROUTES.about}#founder` },
      { key: "menu.about.story", href: `${ROUTES.about}#story` },
      { key: "menu.about.numbers", href: `${ROUTES.about}#numbers` },
      { key: "docs.title", href: ROUTES.aboutDocuments },
      { key: "menu.about.team", href: ROUTES.agents },
    ],
  },

  [ROUTES.agents]: {
    links: [
      { key: "menu.agents.complex", href: `${ROUTES.agents}?focus=complex` },
      { key: "menu.agents.home", href: `${ROUTES.agents}?focus=home` },
      { key: "menu.agents.land", href: `${ROUTES.agents}?focus=land` },
      { key: "menu.agents.all", href: ROUTES.agents },
    ],
  },

  [ROUTES.contacts]: {
    links: [{ key: "menu.contact.address", href: `${ROUTES.contacts}#map` }],
    withSocial: true,
    ctaKey: "menu.contact.request",
    ctaHref: `${ROUTES.contacts}#request`,
  },
};
