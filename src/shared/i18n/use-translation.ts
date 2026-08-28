"use client";

import { useI18nContext } from "./provider";

export function useTranslation() {
  const { t, lang, setLang } = useI18nContext();
  return { t, lang, setLang };
}
