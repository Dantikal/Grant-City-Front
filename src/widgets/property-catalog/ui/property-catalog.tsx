"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import {
  fetchProperties,
  usePropertyFilters,
  PropertyCard,
  PropertyGridSkeleton,
} from "@/entities/property";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_KINDS,
  LISTING_TYPES,
  type ListingType,
  type PropertyCategory,
  type PropertyKind,
} from "@/shared/constants/property-types";
import { queryKeys } from "@/shared/api/query-client";
import { useTranslation } from "@/shared/i18n";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { usePagination } from "@/shared/hooks/use-pagination";
import { FavoriteButton } from "@/features/toggle-favorite";
import { PropertySearch } from "@/features/property-search/ui/property-search";
import { PropertyFilters } from "@/features/property-filters/ui/property-filters";
import { PropertySort } from "@/features/property-sort/ui/property-sort";
import { PropertyPagination } from "@/features/property-pagination/ui/property-pagination";
import { RevealGroup, RevealItem } from "@/shared/ui/reveal";

export function PropertyCatalog({ listingType }: { listingType?: ListingType }) {
  const { t } = useTranslation();
  const filters = usePropertyFilters((s) => s.filters);
  const query = useDebounce(filters.query);

  // Filtering and sorting are the backend's job (GET /properties params, API.md §4).
  // A page-level listingType (buy/rent/luxury tabs) overrides the filter control.
  const effective = { ...filters, query, ...(listingType ? { listingType } : {}) };
  const { data: visible, isPending } = useQuery({
    queryKey: queryKeys.properties(effective),
    queryFn: () => fetchProperties(effective),
    placeholderData: keepPreviousData,
  });

  const { page, pageCount, pageItems, setPage } = usePagination(visible ?? [], 6);
  useEffect(() => setPage(1), [filters, listingType, setPage]);

  return (
    <div>
      <Suspense fallback={null}>
        <FilterParamsSync />
      </Suspense>
      <div className="mb-6">
        <PropertySearch />
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <PropertyFilters />
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-sm">
            {t("catalog.homes", { count: visible?.length ?? 0 })}
          </span>
          <PropertySort className="w-[190px]" />
        </div>
      </div>

      {isPending ? (
        <PropertyGridSkeleton count={6} />
      ) : !visible || visible.length === 0 ? (
        <div className="border-border grid place-items-center gap-3 rounded-lg border border-dashed py-24 text-center">
          <SearchX className="text-muted-foreground size-8" />
          <p className="font-serif text-2xl">{t("catalog.noMatch")}</p>
          <p className="text-muted-foreground text-sm">{t("catalog.noMatchSub")}</p>
        </div>
      ) : (
        <RevealGroup
          key={page}
          className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1"
        >
          {pageItems.map((p) => (
            <RevealItem key={p.id}>
              <PropertyCard
                property={p}
                action={<FavoriteButton propertyId={p.id} title={p.title} />}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      )}

      <PropertyPagination page={page} pageCount={pageCount} onPage={setPage} className="mt-12" />
    </div>
  );
}

/**
 * Seeds the filter store from the URL, so header/menu links like
 * `/properties?category=complex` land on a pre-filtered catalog. Unknown or
 * missing values reset that filter back to "all".
 */
function FilterParamsSync() {
  const params = useSearchParams();
  const setFilters = usePropertyFilters((s) => s.setFilters);

  const category = params.get("category");
  const kind = params.get("kind");
  const listingType = params.get("listingType");

  useEffect(() => {
    setFilters({
      category: oneOf(PROPERTY_CATEGORIES, category),
      kind: oneOf(PROPERTY_KINDS, kind),
      listingType: oneOf(LISTING_TYPES, listingType),
    });
  }, [category, kind, listingType, setFilters]);

  return null;
}

function oneOf<T extends string>(allowed: readonly T[], value: string | null): T | "all" {
  return value && (allowed as readonly string[]).includes(value) ? (value as T) : "all";
}
