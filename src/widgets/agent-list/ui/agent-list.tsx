import Link from "next/link";
import { fetchAgents, AgentCard, type Agent } from "@/entities/agent";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { Reveal, RevealGroup, RevealItem } from "@/shared/ui/reveal";
import { cn } from "@/shared/lib/cn";

/** Keywords that decide which agents a header-menu `?focus=` link shows. Matched
 *  case-insensitively against each agent's role and specialties. */
const FOCUS_KEYWORDS: Record<string, string[]> = {
  complex: ["complex", "new build", "new-build", "development", "жк", "комплекс", "новострой"],
  home: ["apartment", "house", "home", "townhouse", "loft", "квартир", "дом", "таунхаус"],
  land: ["land", "plot", "участ", "земл"],
};

function matchesFocus(agent: Agent, focus: string) {
  const keywords = FOCUS_KEYWORDS[focus];
  if (!keywords) return true;
  const haystack = [agent.role, ...agent.specialties].join(" ").toLowerCase();
  return keywords.some((k) => haystack.includes(k));
}

export async function AgentList({
  withHeading = true,
  focus,
  className,
}: {
  withHeading?: boolean;
  /** `complex` | `home` | `land` — narrows the list to agents with that specialty. */
  focus?: string;
  className?: string;
}) {
  const all = await fetchAgents().catch(() => []);
  const { t } = await getT();

  if (all.length === 0) return null;

  const agents = focus ? all.filter((a) => matchesFocus(a, focus)) : all;

  return (
    <section className={cn("bg-brand-sand dark:bg-secondary py-[104px]", className)}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        {withHeading ? (
          <Reveal className="mb-[54px] flex items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="text-brand-accent mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
                {t("home.agents.eyebrow")}
              </div>
              <h2 className="m-0 font-serif text-4xl leading-tight font-medium tracking-[-0.01em] md:text-[46px]">
                {t("home.agents.title")}
              </h2>
            </div>
            <Link
              href={ROUTES.agents}
              className="link-underline pb-1 text-sm font-semibold whitespace-nowrap"
            >
              {t("actions.meetTeam")}
            </Link>
          </Reveal>
        ) : null}

        {agents.length === 0 ? (
          <div className="border-border grid place-items-center gap-3 rounded-lg border border-dashed py-20 text-center">
            <p className="font-serif text-2xl">{t("agentsPage.noMatch")}</p>
            <Link href={ROUTES.agents} className="link-underline pb-1 text-sm font-semibold">
              {t("menu.agents.all")}
            </Link>
          </div>
        ) : (
          <RevealGroup className="grid grid-cols-4 gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {agents.map((a) => (
              <RevealItem key={a.id}>
                <AgentCard agent={a} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
