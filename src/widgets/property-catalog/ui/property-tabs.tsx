import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { cn } from "@/shared/lib/cn";

const TABS = [
  { key: "properties.tabAll", href: ROUTES.properties },
  { key: "properties.tabSale", href: ROUTES.propertiesBuy },
  { key: "properties.tabRent", href: ROUTES.propertiesRent },
  { key: "properties.tabLux", href: ROUTES.propertiesLuxury },
];

export async function PropertyTabs({ active }: { active: string }) {
  const { t } = await getT();
  return (
    <div className="mx-auto flex max-w-[1240px] flex-wrap gap-2 px-6 md:px-12">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
            active === tab.href
              ? "bg-primary text-primary-foreground border-transparent"
              : "border-border hover:bg-accent",
          )}
        >
          {t(tab.key)}
        </Link>
      ))}
    </div>
  );
}
