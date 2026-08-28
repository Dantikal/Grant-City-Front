import { http } from "./axios";
import { ENDPOINTS } from "./endpoints";

/** Upload any file via multipart POST and return its URL (backend responds `{ url }`). */
export async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await http.post<{ url: string }>(ENDPOINTS.uploads, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url;
}

/** @see uploadFile — kept as the image-specific name used by existing callers. */
export const uploadImage = uploadFile;
