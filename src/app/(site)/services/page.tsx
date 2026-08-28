import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { fetchServices } from "@/entities/service";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { PageIntro } from "@/shared/ui/page-intro";
import { Reveal } from "@/shared/ui/reveal";
import { Button } from "@/shared/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Buying, selling, letting and management — full-service property, handled end to end by one named agent.",
};

export default async function ServicesPage() {
  const services = await fetchServices();
  const { t } = await getT();

  return (
    <>
      <PageIntro
        eyebrow={t("home.services.eyebrow")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
      />

      <section className="mx-auto max-w-[1240px] px-6 py-16 md:px-12">
        <div className="space-y-px">
          {services.map((s) => (
            <Reveal key={s.id}>
              <article
                id={s.slug}
                className="border-border grid scroll-mt-24 gap-8 border-t py-14 md:grid-cols-[120px_1fr_1fr]"
              >
                <div className="text-brand-accent font-serif text-5xl font-semibold">{s.no}</div>
                <div>
                  <h2 className="m-0 font-serif text-3xl font-semibold md:text-4xl">
                    {t(`svc.${s.id}.title`)}
                  </h2>
                  <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed">
                    {t(`svc.${s.id}.long`)}
                  </p>
                </div>
                <ul className="space-y-3 self-center">
                  {t(`svc.${s.id}.points`)
                    .split(" | ")
                    .map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <span className="bg-brand-lime text-brand-ink grid size-6 shrink-0 place-items-center rounded-full">
                          <Check className="size-3.5" />
                        </span>
                        <span className="text-[15px]">{p}</span>
                      </li>
                    ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="bg-brand-sand dark:bg-secondary mt-16 flex flex-wrap items-center justify-between gap-6 rounded-xl p-10">
          <div>
            <h3 className="m-0 font-serif text-3xl font-medium">{t("services.ctaTitle")}</h3>
            <p className="text-muted-foreground mt-2">{t("services.ctaText")}</p>
          </div>
          <Button asChild variant="lime" size="lg">
            <Link href={ROUTES.contacts}>{t("actions.talk")}</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
