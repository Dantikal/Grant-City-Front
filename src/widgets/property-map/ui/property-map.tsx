"use client";

import dynamic from "next/dynamic";
import { cn } from "@/shared/lib/cn";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title?: string;
  price?: string;
}

// Leaflet touches `window`, so it must be client-only (no SSR).
const LeafletMap = dynamic(() => import("./leaflet-map").then((m) => m.LeafletMap), {
  ssr: false,
});

export function PropertyMap({
  markers = [],
  center,
  zoom,
  height = 420,
  className,
}: {
  markers?: MapMarker[];
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      style={{ height }}
      className={cn(
        "border-border bg-brand-sand dark:bg-secondary relative z-0 overflow-hidden rounded-xl border",
        className,
      )}
    >
      <LeafletMap markers={markers} center={center} zoom={zoom} />
    </div>
  );
}
