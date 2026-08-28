"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/shared/db/dexie";

export function useFavorites() {
  const favorites = useLiveQuery(() => db.favorites.orderBy("addedAt").reverse().toArray(), [], []);
  const ids = new Set(favorites.map((f) => f.propertyId));
  return { favorites, ids, count: favorites.length };
}

export function useIsFavorite(propertyId: string) {
  const row = useLiveQuery(() => db.favorites.get(propertyId), [propertyId]);
  return Boolean(row);
}

export async function toggleFavorite(propertyId: string): Promise<boolean> {
  const existing = await db.favorites.get(propertyId);
  if (existing) {
    await db.favorites.delete(propertyId);
    return false;
  }
  await db.favorites.add({ propertyId, addedAt: new Date().toISOString() });
  return true;
}
