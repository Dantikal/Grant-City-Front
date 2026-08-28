import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export interface Crumb {
  label: string;
  /** Omitted on the last crumb — the page the user is already on. */
  href?: string;
}

/** Navigation trail. The trailing crumb renders as plain text and is marked
 *  `aria-current`, so screen readers announce the current page. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-muted-foreground flex flex-wrap items-center text-sm", className)}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center">
            {item.href && !last ? (
              <Link
                href={item.href}
                className="link-underline hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="text-foreground font-medium"
                aria-current={last ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            {last ? null : (
              <ChevronRight className="mx-1.5 size-3.5 shrink-0 opacity-60" aria-hidden />
            )}
          </span>
        );
      })}
    </nav>
  );
}
