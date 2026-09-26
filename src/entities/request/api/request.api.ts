import { http } from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { ContactRequest, RequestContext, RequestFormValues } from "../model/request.types";
import type { RequestStatus } from "@/shared/constants/statuses";

/** Capture a lead. The server assigns `id`, `status` ("new") and `createdAt`
 *  (BACKEND_TASK §9), so only the form values are sent. */
export async function createRequest(
  values: RequestFormValues,
  context?: RequestContext,
): Promise<ContactRequest> {
  const { data } = await http.post<ContactRequest>(ENDPOINTS.requests, { ...values, ...context });
  return data;
}

export async function listRequests(): Promise<ContactRequest[]> {
  const { data } = await http.get<ContactRequest[]>(ENDPOINTS.requests);
  return data;
}

export async function updateRequestStatus(
  id: number | string,
  status: RequestStatus,
): Promise<void> {
  await http.patch(ENDPOINTS.request(id), { status });
}

export async function deleteRequest(id: number | string): Promise<void> {
  await http.delete(ENDPOINTS.request(id));
}
