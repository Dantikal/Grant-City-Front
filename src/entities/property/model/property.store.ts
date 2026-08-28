"use client";

import { create } from "zustand";
import type { PropertyFilters } from "./property.types";
import { DEFAULT_FILTERS } from "./property.types";

interface PropertyFilterState {
  filters: PropertyFilters;
  setFilter: <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => void;
  setFilters: (partial: Partial<PropertyFilters>) => void;
  reset: () => void;
}

/** Client-side filter/sort state shared by catalog, filters, search and sort features. */
export const usePropertyFilters = create<PropertyFilterState>((set) => ({
  filters: DEFAULT_FILTERS,
  setFilter: (key, value) => set((s) => ({ filters: { ...s.filters, [key]: value } })),
  setFilters: (partial) => set((s) => ({ filters: { ...s.filters, ...partial } })),
  reset: () => set({ filters: DEFAULT_FILTERS }),
}));
