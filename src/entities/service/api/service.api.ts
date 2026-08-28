import { SERVICES } from "../model/service.mocks";
import type { Service } from "../model/service.types";

export async function fetchServices(): Promise<Service[]> {
  return [...SERVICES];
}

export async function fetchService(idOrSlug: string): Promise<Service | null> {
  return (
    SERVICES.find((s) => s.id === idOrSlug || s.slug === idOrSlug || s.no === idOrSlug) ?? null
  );
}
