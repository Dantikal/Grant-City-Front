import axios, { isAxiosError } from "axios";
import { env } from "@/shared/config/env";
import { clearToken, getToken } from "./token";

/** Fired when the backend answers 401 — the admin auth store listens and de-auths. */
export const UNAUTHORIZED_EVENT = "gc:unauthorized";

/** Shared Axios instance for the REST backend. */
export const http = axios.create({
  baseURL: env.API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Attach the auth token (admin) to every request when present.
http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      // Backend errors arrive as `{ message }` (API.md / BACKEND_TASK §9).
      const message = (error.response?.data as { message?: string } | undefined)?.message;
      if (message) error.message = message;

      if (error.response?.status === 401) {
        clearToken();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
        }
      }
    }
    return Promise.reject(error);
  },
);
