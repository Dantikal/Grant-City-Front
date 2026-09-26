import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { DEPARTMENTS, fetchServices } from "@/entities/service";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { PageIntro } from "@/shared/ui/page-intro";
import { Reveal } from "@/shared/ui/reveal";
import { Button } from "@/shared/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business-Expert Group: valuation of all types of property, business plans and real estate sales.",
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
                    .map((point) => {
                      // "Title :: a ; b" renders a bullet with its own sub-list.
                      const [label, sub] = point.split(" :: ");
                      return (
                        <li key={label}>
                          <div className="flex items-start gap-3">
                            <span className="bg-brand-lime text-brand-ink mt-0.5 grid size-6 shrink-0 place-items-center rounded-full">
                              <Check className="size-3.5" />
                            </span>
                            <span className="text-[15px] leading-relaxed">{label}</span>
                          </div>
                          {sub ? (
                            <ul className="border-border mt-2 ml-3 space-y-1.5 border-l pl-6">
                              {sub.split(" ; ").map((item) => (
                                <li key={item} className="text-muted-foreground text-[15px]">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      );
                    })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Departments */}
        <section id="departments" className="border-border scroll-mt-24 border-t pt-16">
          <Reveal className="mb-10">
            <div className="text-brand-accent mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
              {t("dept.eyebrow")}
            </div>
            <h2 className="m-0 font-serif text-3xl font-medium md:text-4xl">{t("dept.title")}</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {DEPARTMENTS.map((d, i) => (
              <Reveal key={d.id} className="h-full">
                <div className="border-border bg-card flex h-full flex-col rounded-xl border p-7">
                  <div className="text-brand-accent font-serif text-3xl font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-semibold">{t(`dept.${d.id}`)}</h3>
                  <ul className="mt-4 space-y-2">
                    {d.services.map((id) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className="text-muted-foreground hover:text-foreground flex items-start gap-2 text-[15px] transition-colors"
                        >
                          <ArrowRight className="text-brand-accent mt-1 size-3.5 shrink-0" />
                          {t(`svc.${id}.title`)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

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
