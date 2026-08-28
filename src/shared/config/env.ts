/** Centralized, typed access to public environment variables. */
export const env = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
} as const;
