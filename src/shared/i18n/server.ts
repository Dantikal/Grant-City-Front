import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE, LANG_COOKIE, isLang, translator, type LanguageCode } from "./config";

/** Read the active language from the cookie (server components / route handlers). */
export async function getLang(): Promise<LanguageCode> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANGUAGE;
}

/** Get a translate function for the current request's language. */
export async function getT() {
  const lang = await getLang();
  return { lang, t: translator(lang) };
}
