import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/widgets/hero";
import { NavShortcuts } from "@/widgets/nav-shortcuts";
import { FeaturedProperties } from "@/widgets/featured-properties";
import { AgentList } from "@/widgets/agent-list";
import { Partners } from "@/widgets/partners";
import { Testimonials } from "@/widgets/testimonials";
import { FaqSection } from "@/widgets/faq-section";
import { NewsletterSection } from "@/widgets/newsletter-section";
import { SERVICES, ServiceRow } from "@/entities/service";
import { fetchFeaturedProperties } from "@/entities/property";
import { COMPANY_STATS } from "@/entities/company";
import { ROUTES } from "@/shared/constants/routes";
import { appConfig } from "@/shared/config/app.config";
import { getT } from "@/shared/i18n/server";
import { Button } from "@/shared/ui/button";
import { Reveal } from "@/shared/ui/reveal";
import { StatCounter } from "@/shared/ui/stat-counter";

const STAT_KEYS = ["stats.homesPlaced", "stats.neighborhoods", "stats.asking", "stats.rating"];
const VALUE_KEYS = [
  ["values.local.t", "values.local.b"],
  ["values.honest.t", "values.honest.b"],
  ["values.small.t", "values.small.b"],
];

// Catalog data comes from the API at request time.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { t } = await getT();
  const heroFeatured = await fetchFeaturedProperties(1)
    .then((list) => list[0] ?? null)
    .catch(() => null);

  return (
    <>
      <Hero featured={heroFeatured} />

      <NavShortcuts />

      {/* Stat bar */}
      <section className="mx-auto max-w-[1240px] px-6 pt-[72px] pb-10 md:px-12">
        <div className="border-border grid grid-cols-2 border-y md:grid-cols-4">
          {COMPANY_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-7 ${i < COMPANY_STATS.length - 1 ? "md:border-border md:border-r" : ""}`}
            >
              <div className="font-serif text-4xl leading-none font-semibold">
                <StatCounter value={s.value} />
              </div>
              <div className="text-muted-foreground mt-2 text-[13px] tracking-[0.02em]">
                {t(STAT_KEYS[i])}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="mx-auto max-w-[1240px] px-6 py-[104px] md:px-12">
        <div className="grid items-center gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative">
            <div className="relative h-[540px] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1100&q=80"
                alt="The Grand City studio"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="bg-brand-amber text-brand-ink absolute -right-6 -bottom-6 max-w-[200px] rounded-lg p-6">
              <div className="font-serif text-3xl leading-none font-semibold">20+ yrs</div>
              <div className="mt-1.5 text-[13px] opacity-85">{t("home.about.badgeText")}</div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="text-brand-accent mb-5 text-xs font-semibold tracking-[0.22em] uppercase">
              {t("home.about.eyebrow")}
            </div>
            <h2 className="m-0 mb-6 font-serif text-4xl leading-[1.08] font-medium tracking-[-0.01em] md:text-[46px]">
              {t("home.about.title")}
            </h2>
            <p className="text-muted-foreground mb-4 max-w-lg text-base leading-relaxed">
              {t("home.about.p1")}
            </p>
            <p className="text-muted-foreground mb-8 max-w-lg text-base leading-relaxed">
              {t("home.about.p2")}
            </p>
            <div className="flex flex-wrap gap-10">
              {VALUE_KEYS.map(([title, body]) => (
                <div key={title}>
                  <div className="font-serif text-3xl font-semibold">{t(title)}</div>
                  <div className="text-muted-foreground mt-1 max-w-[160px] text-[13px]">
                    {t(body)}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={ROUTES.about}
              className="link-underline mt-8 inline-block pb-1 text-sm font-semibold"
            >
              {t("actions.moreAbout")}
            </Link>
          </Reveal>
        </div>
      </section>

      <Partners />

      <div id="featured" className="scroll-mt-24">
        <FeaturedProperties />
      </div>

      {/* Services preview */}
      <section id="services" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 py-[104px] md:px-12">
        <Reveal className="mb-14 max-w-xl">
          <div className="text-brand-accent mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
            {t("home.services.eyebrow")}
          </div>
          <h2 className="m-0 mb-4 font-serif text-4xl leading-tight font-medium tracking-[-0.01em] md:text-[46px]">
            {t("home.services.title")}
          </h2>
          <p className="text-muted-foreground m-0 text-base leading-relaxed">
            {t("home.services.subtitle")}
          </p>
        </Reveal>
        <div className="border-border grid border-t md:grid-cols-2">
          {SERVICES.map((s) => (
            <ServiceRow
              key={s.id}
              service={s}
              href={`${ROUTES.services}#${s.slug}`}
              title={t(`svc.${s.id}.title`)}
              body={t(`svc.${s.id}.body`)}
            />
          ))}
        </div>
      </section>

      <div id="agents" className="scroll-mt-24">
        <AgentList />
      </div>

      <Testimonials />

      <div id="faq" className="scroll-mt-24">
        <FaqSection />
      </div>

      {/* CTA banner */}
      <section className="bg-brand-ink text-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-10 px-6 py-24 md:px-12">
          <div>
            <div className="text-brand-accent mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
              {t("home.cta.eyebrow")}
            </div>
            <h2 className="m-0 mb-4 font-serif text-4xl leading-[1.03] font-medium tracking-[-0.01em] md:text-[52px]">
              {t("home.cta.title")}
            </h2>
            <p className="m-0 max-w-md text-base leading-relaxed text-[#a8a8a8]">
              {t("home.cta.subtitle")}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Button asChild variant="lime" size="lg">
              <Link href={ROUTES.contacts}>{t("actions.bookViewing")}</Link>
            </Button>
            <span className="text-[15px] text-[#f2f2f2]">
              {t("home.cta.orCall")} <strong className="text-white">{appConfig.phone}</strong>
            </span>
          </div>
        </div>
      </section>

      <div className="pt-[104px]" />
      <NewsletterSection />
    </>
  );
}
