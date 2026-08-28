import Link from "next/link";
import { fetchFeaturedProperties, PropertyCard } from "@/entities/property";
import { FavoriteButton } from "@/features/toggle-favorite";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { Reveal, RevealGroup, RevealItem } from "@/shared/ui/reveal";

export async function FeaturedProperties() {
  const properties = await fetchFeaturedProperties(6).catch(() => []);
  const { t } = await getT();

  if (properties.length === 0) return null;

  return (
    <section id="properties" className="bg-brand-sand dark:bg-secondary py-[104px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <div>
            <div className="text-brand-accent mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
              {t("home.featured.eyebrow")}
            </div>
            <h2 className="m-0 font-serif text-4xl leading-tight font-medium tracking-[-0.01em] md:text-[46px]">
              {t("home.featured.title")}
            </h2>
          </div>
          <Link
            href={ROUTES.properties}
            className="link-underline pb-1 text-sm font-semibold whitespace-nowrap"
          >
            {t("actions.allProperties")}
          </Link>
        </Reveal>

        <RevealGroup className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {properties.map((p) => (
            <RevealItem key={p.id}>
              <PropertyCard
                property={p}
                action={<FavoriteButton propertyId={p.id} title={p.title} />}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
