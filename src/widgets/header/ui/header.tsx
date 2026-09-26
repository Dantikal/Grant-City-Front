"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "@/shared/i18n";
import { useFavorites } from "@/features/toggle-favorite";
import { LanguageSwitcher } from "@/features/language-switcher/ui/language-switcher";
import { MobileMenu } from "@/widgets/mobile-menu";
import { Button } from "@/shared/ui/button";
import { SocialLinks } from "@/shared/ui/social-links";
import { NavMenu } from "./nav-menu";

export function Header() {
  const { count } = useFavorites();
  const { t } = useTranslation();

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="flex items-center gap-6 px-6 py-4 md:px-12 md:py-4">
        {/* Decorated logo */}
        <Link href={ROUTES.home} className="group flex items-center gap-2.5">
          <span className="bg-brand-green grid size-8 place-items-center rounded-lg font-serif text-lg font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            G
          </span>
          <span className="text-foreground font-serif text-[22px] font-bold tracking-[0.18em]">
            GRAND&nbsp;CITY
          </span>
        </Link>

        {/* Centered nav, pushes the right cluster to the far edge */}
        <NavMenu className="hidden flex-1 xl:flex" />

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2.5 xl:ml-0">
          <SocialLinks className="hidden 2xl:flex" />
          <span className="bg-border hidden h-5 w-px 2xl:block" aria-hidden />
          <Link
            href={ROUTES.favorites}
            aria-label={t("common.favorites")}
            className="border-border hover:bg-accent relative hidden size-9 place-items-center rounded-full border transition-colors sm:grid"
          >
            <Heart className="size-4" />
            {count > 0 ? (
              <span className="bg-brand-amber text-brand-ink absolute -top-1 -right-1 grid size-[18px] place-items-center rounded-full text-[10px] font-bold">
                {count}
              </span>
            ) : null}
          </Link>
          <LanguageSwitcher className="hidden sm:flex" />
          <Button asChild variant="lime" size="sm" className="hidden min-[1400px]:inline-flex">
            <Link href={ROUTES.contacts}>{t("actions.bookViewing")}</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
