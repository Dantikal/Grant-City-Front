"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/shared/constants/nav";
import { NAV_MENUS, type NavMenu } from "@/shared/constants/nav-menu";
import { ROUTES } from "@/shared/constants/routes";
import { appConfig } from "@/shared/config/app.config";
import { useTranslation } from "@/shared/i18n";
import { socialIcon } from "@/shared/ui/social-links";
import { cn } from "@/shared/lib/cn";

/** Grace period so the pointer can travel from the trigger into the panel. */
const CLOSE_DELAY = 140;

export function NavMenu({ className }: { className?: string }) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [openHref, setOpenHref] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const open = useCallback(
    (href: string) => {
      cancelClose();
      setOpenHref(href);
    },
    [cancelClose],
  );

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenHref(null), CLOSE_DELAY);
  }, [cancelClose]);

  // Any navigation closes the panel — the pathname may not change for hash links,
  // so the individual links close it too.
  useEffect(() => setOpenHref(null), [pathname]);
  useEffect(() => cancelClose, [cancelClose]);

  const isActive = (href: string) =>
    href === ROUTES.home ? pathname === href : pathname.startsWith(href);

  return (
    <nav className={cn("items-center justify-center gap-7", className)}>
      {NAV_ITEMS.map((item) => {
        const menu: NavMenu | undefined = NAV_MENUS[item.href];
        const isOpen = openHref === item.href;

        return (
          // The panel is a descendant, so the pointer can travel from the trigger
          // into it without ever leaving this wrapper.
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => (menu ? open(item.href) : scheduleClose())}
            onMouseLeave={scheduleClose}
            onFocus={() => (menu ? open(item.href) : scheduleClose())}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose();
            }}
          >
            <Link
              href={item.href}
              aria-haspopup={menu ? "true" : undefined}
              aria-expanded={menu ? isOpen : undefined}
              className={cn(
                "flex items-center gap-1 py-2 text-[15px] font-bold tracking-[0.01em] whitespace-nowrap transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="link-underline">{t(item.key)}</span>
              {menu ? (
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              ) : null}
            </Link>

            <AnimatePresence>
              {menu && isOpen ? (
                <MenuPanel menu={menu} onNavigate={() => setOpenHref(null)} />
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

function MenuPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const { t } = useTranslation();
  const hasDescriptions = menu.links.some((l) => l.descKey);

  return (
    <motion.div
      // `pt-4` bridges the gap under the trigger so the pointer never leaves the panel.
      className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <div
        className={cn(
          "border-border bg-popover overflow-hidden rounded-xl border p-2 shadow-xl",
          hasDescriptions ? "w-[360px]" : "w-[248px]",
        )}
      >
        {menu.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="group hover:bg-accent flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors"
          >
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{t(link.key)}</span>
              {link.descKey ? (
                <span className="text-muted-foreground mt-0.5 block text-[13px] leading-snug">
                  {t(link.descKey)}
                </span>
              ) : null}
            </span>
            <ArrowRight className="text-brand-accent mt-0.5 size-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
          </Link>
        ))}

        {menu.withSocial ? (
          <>
            {menu.links.length > 0 ? <div className="bg-border my-2 h-px" /> : null}
            <div className="grid grid-cols-2 gap-1">
              {appConfig.social.map((s) => {
                const Icon = socialIcon(s.label);
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={onNavigate}
                    className="hover:bg-accent flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors"
                  >
                    <Icon className="text-brand-accent size-4 shrink-0" />
                    {s.label}
                  </a>
                );
              })}
            </div>
          </>
        ) : null}

        {menu.ctaKey && menu.ctaHref ? (
          <>
            <div className="bg-border my-2 h-px" />
            <Link
              href={menu.ctaHref}
              onClick={onNavigate}
              className="bg-brand-lime text-brand-ink flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              {t(menu.ctaKey)}
              <ArrowRight className="size-3.5" />
            </Link>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}
