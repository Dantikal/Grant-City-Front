import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "../model/service.types";
import { cn } from "@/shared/lib/cn";

export function ServiceRow({
  service,
  href,
  title,
  body,
  className,
}: {
  service: Service;
  href: string;
  /** Optional translated overrides; fall back to the entity's own text. */
  title?: string;
  body?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group border-border hover:bg-muted/60 flex items-start gap-[26px] rounded-lg border-b py-10 pr-10 transition-colors",
        className,
      )}
    >
      <div className="text-brand-accent min-w-10 font-serif text-[22px] font-semibold">
        {service.no}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-4">
          <h3 className="mb-3 font-serif text-[28px] font-semibold">{title ?? service.title}</h3>
          <ArrowRight className="text-brand-accent size-4 transition-transform group-hover:translate-x-1" />
        </div>
        <p className="text-muted-foreground max-w-md text-[15px] leading-relaxed">
          {body ?? service.body}
        </p>
      </div>
    </Link>
  );
}
