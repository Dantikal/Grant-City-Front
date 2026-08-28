"use client";

import { usePropertyFilters } from "@/entities/property";
import { SORT_OPTIONS, type SortOption } from "@/shared/constants/property-types";
import { useTranslation } from "@/shared/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

export function PropertySort({ className }: { className?: string }) {
  const { t } = useTranslation();
  const sort = usePropertyFilters((s) => s.filters.sort);
  const setFilter = usePropertyFilters((s) => s.setFilter);

  return (
    <Select value={sort} onValueChange={(v) => setFilter("sort", v as SortOption)}>
      <SelectTrigger className={className} aria-label="Sort properties">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {t(`sort.${o.value}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
