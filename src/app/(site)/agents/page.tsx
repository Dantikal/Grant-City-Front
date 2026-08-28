import type { Metadata } from "next";
import Link from "next/link";
import { AgentList } from "@/widgets/agent-list";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { PageIntro } from "@/shared/ui/page-intro";
import { cn } from "@/shared/lib/cn";

export const metadata: Metadata = {
  title: "Agents",
  description: "Meet the small team behind Grand City — agents you'll actually know by name.",
};

// Agent data lives in the backend — render on demand.
export const dynamic = "force-dynamic";

/** Mirrors the `?focus=` links in the header menu. */
const FOCUS_TABS = [
  { value: "", key: "menu.agents.all" },
  { value: "complex", key: "menu.agents.complex" },
  { value: "home", key: "menu.agents.home" },
  { value: "land", key: "menu.agents.land" },
];

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>;
}) {
  const { focus } = await searchParams;
  const { t } = await getT();
  const active = FOCUS_TABS.some((tab) => tab.value === focus) ? (focus ?? "") : "";

  return (
    <>
      <PageIntro
        eyebrow={t("home.agents.eyebrow")}
        title={t("agentsPage.title")}
        subtitle={t("agentsPage.subtitle")}
      />

      <div className="mx-auto flex max-w-[1240px] flex-wrap gap-2 px-6 md:px-12">
        {FOCUS_TABS.map((tab) => (
          <Link
            key={tab.value || "all"}
            href={tab.value ? `${ROUTES.agents}?focus=${tab.value}` : ROUTES.agents}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
              active === tab.value
                ? "bg-primary text-primary-foreground border-transparent"
                : "border-border hover:bg-accent",
            )}
          >
            {t(tab.key)}
          </Link>
        ))}
      </div>

      <div className="pt-6" />
      <AgentList withHeading={false} focus={active || undefined} />
    </>
  );
}
