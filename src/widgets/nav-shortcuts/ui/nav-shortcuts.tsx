import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChartColumn,
  Compass,
  Landmark,
  PhoneCall,
  Users,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS } from "@/shared/constants/nav";
import { getT } from "@/shared/i18n/server";
import { Reveal, RevealGroup, RevealItem } from "@/shared/ui/reveal";
import { cn } from "@/shared/lib/cn";

/** Keyed by nav key so it stays in step with NAV_ITEMS. */
const ICONS: Record<string, LucideIcon> = {
  "nav.home": Compass,
  "nav.properties": Building2,
  "nav.services": ChartColumn,
  "nav.about": Landmark,
  "nav.agents": Users,
  "nav.contact": PhoneCall,
};

/** The header's navigation, repeated under the hero as a two-column index.
 *  Built in the same language as the services grid — hairline rules on the page
 *  background, gold accents, serif titles — so it reads as part of the page
 *  rather than a panel dropped onto it. Also the primary way in on a phone,
 *  where the nav sits behind the burger. */
export async function NavShortcuts() {
  const { t } = await getT();

  return (
    <section id="explore" className="mx-auto max-w-[1240px] px-6 pt-[88px] md:px-12">
      <Reveal className="text-brand-accent mb-7 text-xs font-semibold tracking-[0.22em] uppercase">
        {t("navIndex.eyebrow")}
      </Reveal>

      <RevealGroup className="grid gap-4 sm:grid-cols-2">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.key];
          return (
            <RevealItem key={item.href} className="h-full">
              <Link
                href={item.href}
                className={cn(
                  "group border-border bg-muted flex h-full items-start gap-5 rounded-lg border p-6 transition-colors duration-300 md:p-7",
                  // Hover goes a shade darker, the same direction as the services rows.
                  "hover:border-brand-lime/50 hover:bg-accent",
                )}
              >
                <span className="bg-brand-accent/10 text-brand-accent group-hover:bg-brand-lime grid size-12 shrink-0 place-items-center rounded-lg transition-colors duration-300 group-hover:text-white">
                  <Icon className="size-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-serif text-[24px] leading-tight font-semibold md:text-[28px]">
                      {t(item.key)}
                    </span>
                    <ArrowRight className="text-brand-accent size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-muted-foreground mt-2.5 block max-w-md text-[15px] leading-relaxed">
                    {t(item.desc)}
                  </span>
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
