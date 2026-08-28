/** A favorited property, keyed by propertyId. */
export interface FavoriteRow {
  propertyId: string;
  addedAt: string;
}

export const DB_NAME = "grand-city";
export const DB_VERSION = 2;

/** Dexie store/index definitions. Favorites are the only local-first data —
 *  requests/bookings go to the backend (tables dropped in v2). */
export const STORES = {
  favorites: "propertyId, addedAt",
  requests: null,
  bookings: null,
} as const;
