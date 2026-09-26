"use client";

import Link from "next/link";
import { appConfig } from "@/shared/config/app.config";
import { ROUTES } from "@/shared/constants/routes";
import { useSettings } from "@/shared/store/settings.store";
import { useTranslation } from "@/shared/i18n";

export function Footer() {
  const { t } = useTranslation();
  const settings = useSettings();

  return (
    <footer className="bg-brand-ink pt-16 pb-9 text-[#b5b5b5]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="flex flex-wrap justify-between gap-10 border-b border-[#262626] pb-11">
          <div className="max-w-xs">
            <div className="mb-3.5 flex items-center gap-2.5">
              <span className="bg-brand-green grid size-8 place-items-center rounded-lg font-serif text-lg font-bold text-white">
                G
              </span>
              <span className="font-serif text-2xl font-bold tracking-[0.16em] text-white">
                GRAND CITY
              </span>
            </div>
            <p className="text-sm leading-relaxed">{t("footer.tagline")}</p>
          </div>
          <div className="flex flex-wrap gap-16">
            <FooterCol title={t("footer.explore")}>
              <FooterLink href={ROUTES.properties}>{t("nav.properties")}</FooterLink>
              <FooterLink href={ROUTES.services}>{t("nav.services")}</FooterLink>
              <FooterLink href={ROUTES.about}>{t("nav.about")}</FooterLink>
              <FooterLink href={ROUTES.experience}>{t("nav.experience")}</FooterLink>
              <FooterLink href={ROUTES.agents}>{t("nav.agents")}</FooterLink>
            </FooterCol>
            <FooterCol title={t("footer.company")}>
              <FooterLink href={ROUTES.favorites}>{t("footer.favorites")}</FooterLink>
              <FooterLink href={ROUTES.contacts}>{t("footer.contact")}</FooterLink>
              <FooterLink href={ROUTES.privacy}>{t("footer.privacy")}</FooterLink>
              <FooterLink href={ROUTES.terms}>{t("footer.terms")}</FooterLink>
            </FooterCol>
            <FooterCol title={t("footer.studio")}>
              <span className="text-sm">{settings.street}</span>
              <span className="text-sm">
                {settings.city} {settings.region} {settings.postal}
              </span>
              <span className="text-sm">{settings.phone}</span>
              <span className="text-sm">{settings.email}</span>
            </FooterCol>
            <FooterCol title={t("footer.social")}>
              {appConfig.social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline w-fit text-sm transition-colors hover:text-white"
                >
                  {s.label}
                  {s.handle ? <span className="text-[#7a7a7a]"> {s.handle}</span> : null}
                </a>
              ))}
            </FooterCol>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 pt-6 text-[13px] text-[#7a7a7a]">
          <span>{t("footer.rights", { year: new Date().getFullYear() })}</span>
          <span>{t("footer.license")}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="mb-1 text-xs tracking-[0.14em] text-[#7a7a7a] uppercase">{title}</div>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link-underline w-fit text-sm transition-colors hover:text-white">
      {children}
    </Link>
  );
}
