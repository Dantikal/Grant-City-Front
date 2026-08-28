"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export function PropertyPagination({
  page,
  pageCount,
  onPage,
  className,
}: {
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
  className?: string;
}) {
  if (pageCount <= 1) return null;

  return (
    <nav
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
        className="border-border hover:bg-accent grid size-10 place-items-center rounded-full border transition-colors disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </button>
      {Array.from({ length: pageCount }).map((_, i) => {
        const n = i + 1;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onPage(n)}
            aria-current={n === page}
            className={cn(
              "size-10 rounded-full text-sm font-semibold transition-colors",
              n === page ? "bg-primary text-primary-foreground" : "hover:bg-accent",
            )}
          >
            {n}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => onPage(page + 1)}
        disabled={page >= pageCount}
        className="border-border hover:bg-accent grid size-10 place-items-center rounded-full border transition-colors disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
