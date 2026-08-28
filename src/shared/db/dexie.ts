import Dexie, { type Table } from "dexie";
import { DB_NAME, DB_VERSION, STORES, type FavoriteRow } from "./schema";

/** Local IndexedDB store — favorites only (a browser preference, not API data). */
export class GrandCityDB extends Dexie {
  favorites!: Table<FavoriteRow, string>;

  constructor() {
    super(DB_NAME);
    this.version(DB_VERSION).stores(STORES);
  }
}

export const db = new GrandCityDB();
