import { z } from "zod";

/** Reusable field-level schemas shared across forms. */
export const emailSchema = z.string().min(1, "Email is required").email("Enter a valid email");

export const phoneSchema = z
  .string()
  .min(7, "Enter a valid phone number")
  .regex(/^[+()\d\s-]+$/, "Enter a valid phone number");

export const nameSchema = z.string().min(2, "Please enter your name").max(80);

export const messageSchema = z.string().min(10, "Tell us a little more (10+ characters)").max(2000);
