import { isAxiosError } from "axios";
import { http } from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Property, PropertyFilters } from "../model/property.types";
import type { ListingType, SortOption } from "@/shared/constants/property-types";

/** Query params accepted by `GET /properties` (see API.md §4). */
export interface PropertyQueryParams {
  query?: string;
  category?: string;
  listingType?: ListingType;
  kind?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  sort?: SortOption;
  featured?: boolean;
  limit?: number;
}

/** Map UI filter state to the documented query params, dropping the
 *  UI-only "all"/empty values the backend doesn't know about. */
function toQueryParams(filters?: Partial<PropertyFilters>): PropertyQueryParams {
  if (!filters) return {};
  const params: PropertyQueryParams = {};
  if (filters.query?.trim()) params.query = filters.query.trim();
  if (filters.category && filters.category !== "all") params.category = filters.category;
  if (filters.listingType && filters.listingType !== "all")
    params.listingType = filters.listingType;
  if (filters.kind && filters.kind !== "all") params.kind = filters.kind;
  if (filters.minPrice != null) params.minPrice = filters.minPrice;
  if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
  if (filters.beds != null) params.beds = filters.beds;
  if (filters.sort) params.sort = filters.sort;
  return params;
}

/* ---------------- Reads ---------------- */

export async function fetchProperties(filters?: Partial<PropertyFilters>): Promise<Property[]> {
  const { data } = await http.get<Property[]>(ENDPOINTS.properties, {
    params: toQueryParams(filters),
  });
  return data;
}

export async function fetchProperty(idOrSlug: string): Promise<Property | null> {
  try {
    const { data } = await http.get<Property>(ENDPOINTS.property(idOrSlug));
    return data ?? null;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
}

export async function fetchFeaturedProperties(limit = 6): Promise<Property[]> {
  const { data } = await http.get<Property[]>(ENDPOINTS.properties, {
    params: { featured: true, limit } satisfies PropertyQueryParams,
  });
  return data;
}

export async function fetchLatestProperties(limit = 3): Promise<Property[]> {
  const { data } = await http.get<Property[]>(ENDPOINTS.properties, {
    params: { sort: "newest", limit } satisfies PropertyQueryParams,
  });
  return data;
}

export async function fetchPropertiesByListingType(type: ListingType): Promise<Property[]> {
  const { data } = await http.get<Property[]>(ENDPOINTS.properties, {
    params: { listingType: type } satisfies PropertyQueryParams,
  });
  return data;
}

/* ---------------- Writes (admin) ---------------- */
// Create payloads carry a frontend-generated id/slug; the backend may keep or
// override them — we re-sync from the response either way (API.md §5).

export async function createProperty(property: Property): Promise<Property> {
  const { data } = await http.post<Property>(ENDPOINTS.properties, property);
  return data ?? property;
}

export async function updateProperty(property: Property): Promise<Property> {
  const { data } = await http.put<Property>(ENDPOINTS.property(property.id), property);
  return data ?? property;
}

export async function removeProperty(id: string): Promise<void> {
  await http.delete(ENDPOINTS.property(id));
}
