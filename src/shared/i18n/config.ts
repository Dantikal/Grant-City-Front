import { dictionaries } from "./dictionaries";
import { DEFAULT_LANGUAGE, LANGUAGES, type LanguageCode } from "@/shared/constants/languages";

export const LANG_COOKIE = "gc-lang";

export function isLang(v: unknown): v is LanguageCode {
  return typeof v === "string" && LANGUAGES.some((l) => l.code === v);
}

export type TranslateFn = (key: string, vars?: Record<string, string | number>) => string;

/** Build a translate function bound to a language (works on server and client). */
export function translator(lang: LanguageCode): TranslateFn {
  const dict = dictionaries[lang] ?? dictionaries.en;
  return (key, vars) => {
    let str = dict[key] ?? dictionaries.en[key] ?? key;
    if (vars) {
      for (const k of Object.keys(vars)) str = str.replace(`{${k}}`, String(vars[k]));
    }
    return str;
  };
}

export { DEFAULT_LANGUAGE };
export type { LanguageCode };
