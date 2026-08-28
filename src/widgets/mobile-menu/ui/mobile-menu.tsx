"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { NAV_ITEMS } from "@/shared/constants/nav";
import { NAV_MENUS } from "@/shared/constants/nav-menu";
import { useTranslation } from "@/shared/i18n";
import { LanguageSwitcher } from "@/features/language-switcher/ui/language-switcher";
import { Button } from "@/shared/ui/button";
import { SocialLinks } from "@/shared/ui/social-links";
import { cn } from "@/shared/lib/cn";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  /** href of the nav item whose submenu is expanded — one at a time. */
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => setMounted(true), []);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="border-border bg-background grid size-10 place-items-center rounded-full border md:hidden"
      >
        <Menu className="size-5" />
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  // Portaled to <body> so it escapes the header's backdrop-filter and
                  // covers the full viewport with a solid background.
                  className="bg-background fixed inset-0 z-[200] flex flex-col md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border-border flex items-center justify-between border-b px-6 py-4">
                    <span className="flex items-center gap-2.5">
                      <span className="bg-brand-green grid size-8 place-items-center rounded-lg font-serif text-lg font-bold text-white">
                        G
                      </span>
                      <span className="font-serif text-xl font-bold tracking-[0.16em]">
                        GRAND CITY
                      </span>
                    </span>
                    <button
                      type="button"
                      aria-label="Close menu"
                      onClick={() => setOpen(false)}
                      className="border-border grid size-10 place-items-center rounded-full border"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
                    {NAV_ITEMS.map((item, i) => {
                      const menu = NAV_MENUS[item.href];
                      const isExpanded = expanded === item.href;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i + 0.05 }}
                          className="border-border border-b"
                        >
                          <div className="flex items-center justify-between">
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "block py-4 font-serif text-3xl font-medium",
                                pathname === item.href ? "text-brand-green" : "text-foreground",
                              )}
                            >
                              {t(item.key)}
                            </Link>
                            {menu ? (
                              <button
                                type="button"
                                aria-label={`${t(item.key)} — submenu`}
                                aria-expanded={isExpanded}
                                onClick={() => setExpanded(isExpanded ? null : item.href)}
                                className="border-border grid size-9 shrink-0 place-items-center rounded-full border"
                              >
                                <ChevronDown
                                  className={cn(
                                    "size-4 transition-transform",
                                    isExpanded && "rotate-180",
                                  )}
                                />
                              </button>
                            ) : null}
                          </div>

                          <AnimatePresence initial={false}>
                            {menu && isExpanded ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-1 pb-4">
                                  {menu.links.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      onClick={() => setOpen(false)}
                                      className="text-muted-foreground hover:text-foreground py-1.5 text-base"
                                    >
                                      {t(link.key)}
                                    </Link>
                                  ))}
                                  {menu.withSocial ? <SocialLinks className="mt-1 -ml-2" /> : null}
                                  {menu.ctaKey && menu.ctaHref ? (
                                    <Link
                                      href={menu.ctaHref}
                                      onClick={() => setOpen(false)}
                                      className="bg-brand-lime text-brand-ink mt-2 rounded-lg px-4 py-2.5 text-center text-sm font-semibold"
                                    >
                                      {t(menu.ctaKey)}
                                    </Link>
                                  ) : null}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <div className="border-border mt-auto space-y-5 border-t px-6 py-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">{t("common.language")}</span>
                      <LanguageSwitcher />
                    </div>
                    <Button asChild variant="lime" size="lg" className="w-full">
                      <Link href={ROUTES.contacts} onClick={() => setOpen(false)}>
                        {t("actions.bookViewing")}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
