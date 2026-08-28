"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { http, UNAUTHORIZED_EVENT } from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { clearToken, setToken } from "@/shared/api/token";

interface AuthState {
  authed: boolean;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      authed: false,
      login: async (user, pass) => {
        try {
          const { data } = await http.post<{ token: string }>(ENDPOINTS.login, {
            username: user.trim(),
            password: pass,
          });
          if (data?.token) {
            setToken(data.token);
            set({ authed: true });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
      logout: () => {
        clearToken();
        set({ authed: false });
      },
    }),
    { name: "gc-admin-auth", version: 1 },
  ),
);

// The token expired or was rejected (401) — drop the session so the admin
// panel falls back to the login screen instead of failing request by request.
if (typeof window !== "undefined") {
  window.addEventListener(UNAUTHORIZED_EVENT, () => useAuth.setState({ authed: false }));
}
