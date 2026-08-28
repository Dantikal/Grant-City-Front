import { http } from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { LanguageCode } from "@/shared/constants/languages";
import type { Certificate, Presentation, PresentationsByLang } from "../model/certificate.types";

/* ---------------- Certificates ---------------- */

/** Gallery order is the order the backend returns — see `reorderCertificates`. */
export async function fetchCertificates(): Promise<Certificate[]> {
  const { data } = await http.get<Certificate[]>(ENDPOINTS.certificates);
  return data ?? [];
}

export async function createCertificate(certificate: Certificate): Promise<Certificate> {
  const { data } = await http.post<Certificate>(ENDPOINTS.certificates, certificate);
  return data ?? certificate;
}

export async function updateCertificate(certificate: Certificate): Promise<Certificate> {
  const { data } = await http.put<Certificate>(ENDPOINTS.certificate(certificate.id), certificate);
  return data ?? certificate;
}

export async function removeCertificate(id: string): Promise<void> {
  await http.delete(ENDPOINTS.certificate(id));
}

/** Persists the gallery order as the full list of ids, top to bottom. */
export async function reorderCertificates(ids: string[]): Promise<void> {
  await http.put(ENDPOINTS.certificatesOrder, { ids });
}

/* ---------------- Presentations (one file per language) ---------------- */

export async function fetchPresentations(): Promise<PresentationsByLang> {
  const { data } = await http.get<PresentationsByLang>(ENDPOINTS.presentations);
  return data ?? {};
}

export async function savePresentation(
  lang: LanguageCode,
  presentation: Presentation,
): Promise<Presentation> {
  const { data } = await http.put<Presentation>(ENDPOINTS.presentation(lang), presentation);
  return data ?? presentation;
}

export async function removePresentation(lang: LanguageCode): Promise<void> {
  await http.delete(ENDPOINTS.presentation(lang));
}
