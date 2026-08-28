"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { usePropertyFilters } from "@/entities/property";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useTranslation } from "@/shared/i18n";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/cn";

export function PropertySearch({ className }: { className?: string }) {
  const { t } = useTranslation();
  const setFilter = usePropertyFilters((s) => s.setFilter);
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 300);

  useEffect(() => {
    setFilter("query", debounced);
  }, [debounced, setFilter]);

  return (
    <div className={cn("relative", className)}>
      <Search className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("catalog.search")}
        className="pl-10"
        aria-label="Search properties"
      />
    </div>
  );
}
