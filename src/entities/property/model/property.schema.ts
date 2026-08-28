import { z } from "zod";
import { PROPERTY_STATUSES } from "@/shared/constants/statuses";
import { LISTING_TYPES, PROPERTY_KINDS } from "@/shared/constants/property-types";

/** Validation schema for creating/editing a property (admin forms). */
export const propertySchema = z.object({
  title: z.string().min(3, "Title is too short").max(120),
  area: z.string().min(2, "Add a neighborhood"),
  city: z.string().min(2, "Add a city"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  rentPeriod: z.enum(["month"]).nullable().default(null),
  listingType: z.enum(LISTING_TYPES),
  kind: z.enum(PROPERTY_KINDS),
  status: z.enum(PROPERTY_STATUSES),
  beds: z.coerce.number().int().min(0).max(20),
  baths: z.coerce.number().int().min(0).max(20),
  sqft: z.coerce.number().int().positive(),
  description: z.string().min(10, "Add a short description").max(4000),
  features: z.array(z.string()).default([]),
  agentId: z.string().min(1, "Assign an agent"),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
