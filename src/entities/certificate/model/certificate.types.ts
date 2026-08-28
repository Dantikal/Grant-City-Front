import type { LanguageCode } from "@/shared/constants/languages";

export interface Certificate {
  id: string;
  title: string;
  /** Awarding body, e.g. "Торгово-промышленная палата КР". */
  issuer: string;
  /** Year of issue as a plain string so partial dates ("2023–2024") stay intact. */
  year: string;
  /** Image URL from `/uploads`, a pasted link, or a data URL. */
  image: string;
}

export interface Presentation {
  /** URL of the uploaded file. Empty means "fall back to the generated PDF". */
  url: string;
  /** File name suggested to the browser on download. */
  name: string;
}

/** Uploaded presentation files keyed by language code. */
export type PresentationsByLang = Partial<Record<LanguageCode, Presentation>>;
