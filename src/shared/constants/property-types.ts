export const LISTING_TYPES = ["buy", "rent", "luxury"] as const;
export type ListingType = (typeof LISTING_TYPES)[number];

/** Top-level split: residential complexes (ЖК) vs individual apartments/houses. */
export const PROPERTY_CATEGORIES = ["complex", "home"] as const;
export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];

export const PROPERTY_CATEGORY_LABELS: Record<PropertyCategory, string> = {
  complex: "Residential complex",
  home: "Apartment / house",
};

export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  buy: "For sale",
  rent: "To rent",
  luxury: "Luxury",
};

export const PROPERTY_KINDS = [
  "house",
  "bungalow",
  "loft",
  "apartment",
  "townhouse",
  "new-build",
  "land",
] as const;
export type PropertyKind = (typeof PROPERTY_KINDS)[number];

export const PROPERTY_KIND_LABELS: Record<PropertyKind, string> = {
  house: "House",
  bungalow: "Bungalow",
  loft: "Loft",
  apartment: "Apartment",
  townhouse: "Townhouse",
  "new-build": "New build",
  land: "Land plot",
};

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "beds-desc", label: "Most bedrooms" },
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
