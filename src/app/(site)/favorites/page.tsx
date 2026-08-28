"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { HeartOff } from "lucide-react";
import { fetchProperties, PropertyCard } from "@/entities/property";
import { FavoriteButton, useFavorites } from "@/features/toggle-favorite";
import { queryKeys } from "@/shared/api/query-client";
import { ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "@/shared/i18n";
import { Button } from "@/shared/ui/button";
import { PageIntro } from "@/shared/ui/page-intro";

export default function FavoritesPage() {
  const { t } = useTranslation();
  const { ids, count } = useFavorites();
  const { data: properties } = useQuery({
    queryKey: queryKeys.properties(),
    queryFn: () => fetchProperties(),
  });
  const saved = (properties ?? []).filter((p) => ids.has(p.id));

  return (
    <>
      <PageIntro
        eyebrow={t("favorites.eyebrow")}
        title={t("favorites.title")}
        subtitle={count > 0 ? t("catalog.homes", { count }) : undefined}
      />
      <section className="mx-auto max-w-[1240px] px-6 py-12 md:px-12">
        {saved.length === 0 ? (
          <div className="border-border grid place-items-center gap-3 rounded-xl border border-dashed py-24 text-center">
            <HeartOff className="text-muted-foreground size-8" />
            <p className="font-serif text-2xl">{t("favorites.empty")}</p>
            <p className="text-muted-foreground max-w-sm text-sm">{t("favorites.emptySub")}</p>
            <Button asChild variant="lime" className="mt-2">
              <Link href={ROUTES.properties}>{t("favorites.browse")}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1">
            {saved.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                action={<FavoriteButton propertyId={p.id} title={p.title} />}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
