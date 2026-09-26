import { z } from "zod";
import { emailSchema, messageSchema, nameSchema, phoneSchema } from "@/shared/lib/validators";
import type { RequestStatus } from "@/shared/constants/statuses";

/** Enquiry types offered in the contact form; each routes to a CRM department. */
export const REQUEST_KINDS = ["general", "valuation", "business-plan", "sales", "viewing"] as const;
export type RequestKind = (typeof REQUEST_KINDS)[number];

export const requestSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal("")),
  kind: z.enum(REQUEST_KINDS).default("general"),
  message: messageSchema,
});

export type RequestFormValues = z.infer<typeof requestSchema>;

/** Where the enquiry was sent from: the CRM gives the lead to this employee and links the property. */
export interface RequestContext {
  agentId?: string;
  propertyId?: string;
}

export interface ContactRequest extends RequestFormValues {
  id?: number | string;
  status: RequestStatus;
  createdAt: string;
}
