import { z } from "zod";
import { emailSchema, messageSchema, nameSchema, phoneSchema } from "@/shared/lib/validators";
import type { RequestStatus } from "@/shared/constants/statuses";

export const REQUEST_KINDS = ["general", "viewing", "valuation", "letting"] as const;
export type RequestKind = (typeof REQUEST_KINDS)[number];

export const requestSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal("")),
  kind: z.enum(REQUEST_KINDS).default("general"),
  message: messageSchema,
});

export type RequestFormValues = z.infer<typeof requestSchema>;

export interface ContactRequest extends RequestFormValues {
  id?: number | string;
  status: RequestStatus;
  createdAt: string;
}
