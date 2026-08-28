import type { PropertyStatus } from "@/shared/constants/statuses";
import type {
  ListingType,
  PropertyCategory,
  PropertyKind,
  SortOption,
} from "@/shared/constants/property-types";

export interface Property {
  id: string;
  slug: string;
  title: string;
  area: string;
  city: string;
  price: number;
  /** "month" for rentals, null for sales. */
  rentPeriod: "month" | null;
  /** Residential complex (ЖК) vs individual apartment/house. */
  category: PropertyCategory;
  listingType: ListingType;
  kind: PropertyKind;
  status: PropertyStatus;
  beds: number;
  baths: number;
  sqft: number;
  images: string[];
  description: string;
  features: string[];
  agentId: string;
  coordinates: { lat: number; lng: number };
  featured: boolean;
  createdAt: string;
}

export interface PropertyFilters {
  query: string;
  category: PropertyCategory | "all";
  listingType: ListingType | "all";
  kind: PropertyKind | "all";
  minPrice: number | null;
  maxPrice: number | null;
  beds: number | null;
  sort: SortOption;
}

export const DEFAULT_FILTERS: PropertyFilters = {
  query: "",
  category: "all",
  listingType: "all",
  kind: "all",
  minPrice: null,
  maxPrice: null,
  beds: null,
  sort: "newest",
};
