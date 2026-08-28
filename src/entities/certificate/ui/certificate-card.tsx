"use client";

import { Expand } from "lucide-react";
import type { Certificate } from "../model/certificate.types";
import { cn } from "@/shared/lib/cn";

export function CertificateCard({
  certificate,
  onOpen,
  className,
}: {
  certificate: Certificate;
  onOpen?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group border-border bg-card block w-full overflow-hidden rounded-xl border text-left transition-shadow hover:shadow-lg",
        className,
      )}
    >
      {/* Certificates are portrait scans of wildly different sizes — a fixed frame
          with `object-contain` keeps the grid even without cropping anything off. */}
      <div className="bg-muted relative grid aspect-[3/4] place-items-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={certificate.image}
          alt={certificate.title}
          loading="lazy"
          className="size-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="bg-background/90 absolute right-3 bottom-3 grid size-9 place-items-center rounded-full opacity-0 shadow transition-opacity group-hover:opacity-100">
          <Expand className="size-4" />
        </span>
      </div>
      <div className="p-5">
        <h3 className="m-0 font-serif text-lg leading-snug font-semibold">{certificate.title}</h3>
        {certificate.issuer || certificate.year ? (
          <p className="text-muted-foreground mt-1.5 text-sm">
            {[certificate.issuer, certificate.year].filter(Boolean).join(" · ")}
          </p>
        ) : null}
      </div>
    </button>
  );
}
