"use client";

import { usePropertyFilters } from "@/entities/property";
import {
  LISTING_TYPES,
  PROPERTY_CATEGORIES,
  PROPERTY_KINDS,
  type ListingType,
  type PropertyCategory,
  type PropertyKind,
} from "@/shared/constants/property-types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { useTranslation } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";

const BEDS = [1, 2, 3, 4, 5];

export function PropertyFilters({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { filters, setFilter, reset } = usePropertyFilters();

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Select
        value={filters.category}
        onValueChange={(v) => setFilter("category", v as PropertyCategory | "all")}
      >
        <SelectTrigger className="w-[180px]" aria-label="Category">
          <SelectValue placeholder={t("catalog.anyCategory")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("catalog.anyCategory")}</SelectItem>
          {PROPERTY_CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {t(`category.${c}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.listingType}
        onValueChange={(v) => setFilter("listingType", v as ListingType | "all")}
      >
        <SelectTrigger className="w-[150px]" aria-label="Listing type">
          <SelectValue placeholder={t("catalog.anyListing")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("catalog.anyListing")}</SelectItem>
          {LISTING_TYPES.map((lt) => (
            <SelectItem key={lt} value={lt}>
              {t(`listingType.${lt}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.kind}
        onValueChange={(v) => setFilter("kind", v as PropertyKind | "all")}
      >
        <SelectTrigger className="w-[150px]" aria-label="Property kind">
          <SelectValue placeholder={t("catalog.anyHome")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("catalog.anyHome")}</SelectItem>
          {PROPERTY_KINDS.map((k) => (
            <SelectItem key={k} value={k}>
              {t(`kind.${k}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.beds ? String(filters.beds) : "any"}
        onValueChange={(v) => setFilter("beds", v === "any" ? null : Number(v))}
      >
        <SelectTrigger className="w-[130px]" aria-label="Minimum bedrooms">
          <SelectValue placeholder={t("catalog.anyBeds")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">{t("catalog.anyBeds")}</SelectItem>
          {BEDS.map((b) => (
            <SelectItem key={b} value={String(b)}>
              {t("catalog.beds", { n: b })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
        {t("catalog.clear")}
      </Button>
    </div>
  );
}
