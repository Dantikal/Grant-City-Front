import { z } from "zod";
import { emailSchema, nameSchema, phoneSchema } from "@/shared/lib/validators";

export const bookingSchema = z.object({
  propertyId: z.string().min(1),
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  date: z.string().min(1, "Pick a date"),
  message: z.string().max(1000).optional().default(""),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export interface Booking extends BookingFormValues {
  id?: number | string;
  createdAt: string;
}
