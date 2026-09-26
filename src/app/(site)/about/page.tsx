import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { AgentList } from "@/widgets/agent-list";
import { COMPANY_STATS } from "@/entities/company";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { PageIntro } from "@/shared/ui/page-intro";
import { Reveal } from "@/shared/ui/reveal";
import { StatCounter } from "@/shared/ui/stat-counter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Grand City is a boutique property studio in the Pacific Northwest — fewer homes, more attention, and one named agent from first viewing to closing day.",
};

const STAT_KEYS = ["stats.homesPlaced", "stats.neighborhoods", "stats.asking", "stats.rating"];
const VALUE_KEYS = [
  ["values.local.t", "values.local.b"],
  ["values.honest.t", "values.honest.b"],
  ["values.small.t", "values.small.b"],
];

export default async function AboutPage() {
  const { t } = await getT();

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-6 pt-8 md:px-12">
        <Breadcrumbs
          items={[{ label: t("nav.home"), href: ROUTES.home }, { label: t("nav.about") }]}
        />
      </div>

      <PageIntro
        className="pt-8 md:pt-10"
        eyebrow={t("home.about.eyebrow")}
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      />

      <section className="mx-auto max-w-[1240px] px-6 py-16 md:px-12">
        <Reveal className="relative h-[460px] overflow-hidden rounded-xl">
          <Image
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80"
            alt="The Grand City studio team"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      <section id="story" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 pb-20 md:px-12">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="m-0 font-serif text-3xl leading-tight font-medium md:text-4xl">
              {t("about.storyTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </Reveal>
        </div>
      </section>

      <section id="numbers" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 pb-20 md:px-12">
        <div className="border-border grid grid-cols-2 border-y md:grid-cols-4">
          {COMPANY_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-8 ${i < COMPANY_STATS.length - 1 ? "md:border-border md:border-r" : ""}`}
            >
              <div className="font-serif text-4xl leading-none font-semibold">
                <StatCounter value={s.value} />
              </div>
              <div className="text-muted-foreground mt-2 text-[13px]">{t(STAT_KEYS[i])}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-24 md:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          {VALUE_KEYS.map(([title, body]) => (
            <Reveal key={title}>
              <div className="border-border bg-card rounded-xl border p-8">
                <div className="text-brand-accent font-serif text-3xl font-semibold">
                  {t(title)}
                </div>
                <p className="text-muted-foreground mt-3">{t(body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="founder" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 pb-24 md:px-12">
        <Reveal>
          <div className="bg-brand-ink grid items-center gap-10 rounded-2xl p-8 text-white md:grid-cols-[1fr_1.4fr] md:p-12">
            <div>
              <div className="text-brand-accent mb-3 text-xs font-semibold tracking-[0.22em] uppercase">
                {t("founder.eyebrow")}
              </div>
              <div className="font-serif text-4xl font-medium">{t("founder.name")}</div>
              <div className="mt-2 text-sm text-[#a8a8a8]">{t("founder.role")}</div>
            </div>
            <p className="text-lg leading-relaxed text-[#ececec]">{t("founder.bio")}</p>
          </div>
        </Reveal>
      </section>

      {/* Documents: certificates + presentation */}
      <section
        id="certificates"
        className="mx-auto max-w-[1240px] scroll-mt-24 px-6 pb-24 md:px-12"
      >
        <Reveal>
          <Link
            href={ROUTES.aboutDocuments}
            className="group border-border hover:bg-muted/60 flex flex-wrap items-center justify-between gap-6 rounded-2xl border p-8 transition-colors md:p-10"
          >
            <div className="flex items-start gap-5">
              <span className="bg-brand-sand text-brand-accent dark:bg-secondary grid size-12 shrink-0 place-items-center rounded-xl">
                <Award className="size-5" />
              </span>
              <div>
                <h2 className="m-0 font-serif text-2xl font-medium md:text-3xl">
                  {t("docs.title")}
                </h2>
                <p className="text-muted-foreground mt-2 max-w-lg text-[15px] leading-relaxed">
                  {t("docs.aboutTeaser")}
                </p>
              </div>
            </div>
            <span className="text-brand-accent flex items-center gap-2 text-sm font-semibold">
              {t("certs.open")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>

      <div id="team" className="scroll-mt-24">
        <AgentList withHeading />
      </div>
    </>
  );
}
