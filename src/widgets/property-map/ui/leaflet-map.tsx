"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/shared/lib/map-config";
import type { MapMarker } from "./property-map";

// Self-contained pin (no external image assets, avoids Leaflet's broken-icon issue).
const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:#2bb24c;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);transform:rotate(-45deg)"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -20],
});

export function LeafletMap({
  markers = [],
  center,
  zoom = DEFAULT_MAP_ZOOM,
}: {
  markers?: MapMarker[];
  center?: [number, number]; // [lng, lat] — kept consistent with prior API
  zoom?: number;
}) {
  // Convert to Leaflet's [lat, lng] order.
  const position: [number, number] = center
    ? [center[1], center[0]]
    : markers[0]
      ? [markers[0].lat, markers[0].lng]
      : [DEFAULT_MAP_CENTER[1], DEFAULT_MAP_CENTER[0]];

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={pinIcon}>
          {m.title || m.price ? (
            <Popup>
              {m.title ? <strong>{m.title}</strong> : null}
              {m.price ? (
                <>
                  <br />
                  {m.price}
                </>
              ) : null}
            </Popup>
          ) : null}
        </Marker>
      ))}
    </MapContainer>
  );
}
