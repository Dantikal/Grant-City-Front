import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Property } from "../model/property.types";
import { PropertyBadge } from "./property-badge";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/lib/format-price";
import { cn } from "@/shared/lib/cn";

interface PropertyCardProps {
  property: Property;
  /** Optional action slot (e.g. a favorite toggle) rendered over the image. */
  action?: ReactNode;
  className?: string;
}

export function PropertyCard({ property, action, className }: PropertyCardProps) {
  return (
    <article
      className={cn(
        "group border-border bg-card relative overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-26px_rgba(14,14,14,0.45)]",
        className,
      )}
    >
      <Link href={ROUTES.property(property.slug)} className="absolute inset-0 z-10">
        <span className="sr-only">{property.title}</span>
      </Link>

      <div className="relative h-60 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={property.images[0]?.startsWith("data:")}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />
        <PropertyBadge status={property.status} className="absolute top-3.5 left-3.5 z-20" />
        {action ? <div className="absolute top-3.5 right-3.5 z-20">{action}</div> : null}
      </div>

      <div className="p-[22px] pb-[26px]">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-[25px] leading-tight font-semibold">{property.title}</h3>
          <span className="text-brand-accent text-[17px] font-bold whitespace-nowrap">
            {formatPrice(property.price, property.rentPeriod)}
          </span>
        </div>
        <p className="text-muted-foreground mt-1.5 text-[13px] tracking-[0.02em]">
          {property.area}, {property.city}
        </p>
        <div className="border-border mt-[18px] flex items-center justify-between border-t pt-4">
          <div className="text-foreground/80 flex gap-4 text-[13px] font-medium">
            <span>{property.beds} bd</span>
            <span className="text-border">·</span>
            <span>{property.baths} ba</span>
            <span className="text-border">·</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          <span className="text-[13px] font-bold transition-transform group-hover:translate-x-0.5">
            View →
          </span>
        </div>
      </div>
    </article>
  );
}
