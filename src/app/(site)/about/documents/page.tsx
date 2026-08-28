import type { Metadata } from "next";
import Link from "next/link";
import { Award, ArrowRight, FileText } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { PageIntro } from "@/shared/ui/page-intro";
import { Reveal } from "@/shared/ui/reveal";

export const metadata: Metadata = {
  title: "Documents",
  description:
    "Grand City's certificates and licences, and the company presentation in four languages.",
};

const CHOICES = [
  {
    href: ROUTES.aboutCertificates,
    icon: Award,
    titleKey: "certs.title",
    textKey: "docs.certsText",
  },
  {
    href: ROUTES.aboutPresentation,
    icon: FileText,
    titleKey: "certs.presTitle",
    textKey: "docs.presText",
  },
];

export default async function DocumentsPage() {
  const { t } = await getT();

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-6 pt-8 md:px-12">
        <Breadcrumbs
          items={[
            { label: t("nav.home"), href: ROUTES.home },
            { label: t("nav.about"), href: ROUTES.about },
            { label: t("docs.title") },
          ]}
        />
      </div>

      <PageIntro
        className="pt-8 md:pt-10"
        eyebrow={t("certs.eyebrow")}
        title={t("docs.title")}
        subtitle={t("docs.subtitle")}
      />

      <section className="mx-auto max-w-[1240px] px-6 py-14 pb-24 md:px-12">
        <div className="grid gap-7 md:grid-cols-2">
          {CHOICES.map((choice, i) => (
            <Reveal key={choice.href} delay={i * 0.08}>
              <Link
                href={choice.href}
                className="group border-border bg-card hover:border-brand-accent/50 flex h-full flex-col rounded-2xl border p-9 transition-all hover:shadow-lg md:p-11"
              >
                <span className="bg-brand-sand text-brand-accent dark:bg-secondary mb-7 grid size-14 place-items-center rounded-xl">
                  <choice.icon className="size-6" />
                </span>
                <h2 className="m-0 font-serif text-2xl font-medium md:text-3xl">
                  {t(choice.titleKey)}
                </h2>
                <p className="text-muted-foreground mt-3 mb-8 text-[15px] leading-relaxed">
                  {t(choice.textKey)}
                </p>
                <span className="text-brand-accent mt-auto flex items-center gap-2 text-sm font-semibold">
                  {t("certs.open")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
