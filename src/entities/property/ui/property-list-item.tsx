import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Property } from "../model/property.types";
import { PropertyBadge } from "./property-badge";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/lib/format-price";
import { cn } from "@/shared/lib/cn";

export function PropertyListItem({
  property,
  action,
  className,
}: {
  property: Property;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group border-border bg-card relative grid grid-cols-[260px_1fr] gap-0 overflow-hidden rounded-lg border transition-shadow hover:shadow-[0_18px_40px_-30px_rgba(14,14,14,0.5)] max-sm:grid-cols-1",
        className,
      )}
    >
      <Link href={ROUTES.property(property.slug)} className="absolute inset-0 z-10">
        <span className="sr-only">{property.title}</span>
      </Link>
      <div className="relative h-48 overflow-hidden max-sm:h-56">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="260px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <PropertyBadge status={property.status} className="absolute top-3 left-3 z-20" />
        {action ? <div className="absolute top-3 right-3 z-20">{action}</div> : null}
      </div>
      <div className="flex flex-col justify-center p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-2xl font-semibold">{property.title}</h3>
          <span className="text-brand-accent text-lg font-bold whitespace-nowrap">
            {formatPrice(property.price, property.rentPeriod)}
          </span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {property.area}, {property.city}
        </p>
        <p className="text-muted-foreground mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed">
          {property.description}
        </p>
        <div className="text-foreground/80 mt-4 flex gap-4 text-[13px] font-medium">
          <span>{property.beds} bd</span>
          <span className="text-border">·</span>
          <span>{property.baths} ba</span>
          <span className="text-border">·</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>
      </div>
    </article>
  );
}
