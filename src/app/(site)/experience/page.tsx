import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { Button } from "@/shared/ui/button";
import { PageIntro } from "@/shared/ui/page-intro";
import { Reveal } from "@/shared/ui/reveal";

export const metadata: Metadata = {
  title: "Experience",
  description: "Grand City's track record — our work history and completed projects.",
};

/** Timeline entries; copy lives in the dictionaries under `exp.history.<n>.*`. */
const HISTORY = ["1", "2", "3", "4"];
/** Completed orders; copy lives under `exp.orders.<n>.*`. */
const ORDERS = ["1", "2", "3", "4", "5", "6"];

export default async function ExperiencePage() {
  const { t } = await getT();

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-6 pt-8 md:px-12">
        <Breadcrumbs
          items={[{ label: t("nav.home"), href: ROUTES.home }, { label: t("nav.experience") }]}
        />
      </div>

      <PageIntro
        className="pt-8 md:pt-10"
        eyebrow={t("exp.eyebrow")}
        title={t("exp.title")}
        subtitle={t("exp.subtitle")}
      />

      {/* Work history */}
      <section id="history" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 py-16 md:px-12">
        <Reveal>
          <h2 className="m-0 mb-10 font-serif text-3xl leading-tight font-medium md:text-4xl">
            {t("exp.historyTitle")}
          </h2>
        </Reveal>
        <ol className="border-border relative ml-2 border-l">
          {HISTORY.map((n) => (
            <li key={n} className="relative list-none pb-10 pl-8 last:pb-0">
              <span className="bg-brand-green ring-background absolute top-1.5 -left-[7px] size-3.5 rounded-full ring-4" />
              <Reveal>
                <div className="text-brand-accent text-xs font-semibold tracking-[0.22em] uppercase">
                  {t(`exp.history.${n}.period`)}
                </div>
                <div className="mt-2 font-serif text-2xl font-semibold">
                  {t(`exp.history.${n}.title`)}
                </div>
                <p className="text-muted-foreground mt-2 max-w-2xl text-[15px] leading-relaxed">
                  {t(`exp.history.${n}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Completed orders */}
      <section id="orders" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 pb-24 md:px-12">
        <Reveal>
          <h2 className="m-0 mb-3 font-serif text-3xl leading-tight font-medium md:text-4xl">
            {t("exp.ordersTitle")}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl text-base leading-relaxed">
            {t("exp.ordersSubtitle")}
          </p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORDERS.map((n) => (
            <Reveal key={n} className="h-full">
              <article className="border-border bg-card flex h-full flex-col rounded-xl border p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-brand-accent/10 text-brand-accent rounded-full px-3 py-1 text-xs font-semibold">
                    {t(`exp.orders.${n}.type`)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {t(`exp.orders.${n}.year`)}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight font-semibold">
                  {t(`exp.orders.${n}.title`)}
                </h3>
                <p className="text-muted-foreground mt-2 flex-1 text-[15px] leading-relaxed">
                  {t(`exp.orders.${n}.body`)}
                </p>
                <div className="text-brand-green mt-5 flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="size-4" />
                  {t("exp.done")}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <Button asChild variant="lime" size="lg">
            <Link href={ROUTES.contacts}>{t("exp.cta")}</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
