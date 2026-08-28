"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, translator, type LanguageCode, type TranslateFn } from "./config";

interface I18nContextValue {
  lang: LanguageCode;
  t: TranslateFn;
  setLang: (lang: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  initialLang,
  children,
}: {
  initialLang: LanguageCode;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<LanguageCode>(initialLang);
  const router = useRouter();

  const setLang = useCallback(
    (next: LanguageCode) => {
      setLangState(next); // instant update for client components
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      router.refresh(); // re-render server components with the new locale
    },
    [router],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ lang, t: translator(lang), setLang }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18nContext() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
