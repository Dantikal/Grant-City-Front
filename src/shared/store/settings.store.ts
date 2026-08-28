"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { appConfig } from "@/shared/config/app.config";

export interface CompanySettings {
  phone: string;
  email: string;
  street: string;
  city: string;
  region: string;
  postal: string;
}

const initial: CompanySettings = {
  phone: appConfig.phone,
  email: appConfig.email,
  street: appConfig.address.street,
  city: appConfig.address.city,
  region: appConfig.address.region,
  postal: appConfig.address.postal,
};

interface SettingsState extends CompanySettings {
  update: (patch: Partial<CompanySettings>) => void;
  reset: () => void;
}

/** Editable studio contact details, persisted locally and surfaced in the footer. */
export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...initial,
      update: (patch) => set(patch),
      reset: () => set(initial),
    }),
    {
      name: "gc-settings",
      version: 2,
      // Company details changed (now Bishkek) — refresh defaults for existing stores.
      migrate: (persisted) => ({ ...(persisted as SettingsState), ...initial }),
    },
  ),
);
