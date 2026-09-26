import { http } from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type {
  CrmSummary,
  Lead,
  LeadDetail,
  LeadNote,
  LeadPatch,
  LeadTask,
} from "../model/crm.types";

export async function fetchCrmSummary(): Promise<CrmSummary> {
  const { data } = await http.get<CrmSummary>(ENDPOINTS.crmSummary);
  return data;
}

export async function fetchLeads(): Promise<Lead[]> {
  const { data } = await http.get<Lead[]>(ENDPOINTS.crmLeads);
  return data;
}

export async function fetchLead(id: number | string): Promise<LeadDetail> {
  const { data } = await http.get<LeadDetail>(ENDPOINTS.crmLead(id));
  return data;
}

export async function updateLead(id: number | string, patch: LeadPatch): Promise<Lead> {
  const { data } = await http.patch<Lead>(ENDPOINTS.crmLead(id), patch);
  return data;
}

export async function addLeadNote(id: number | string, text: string): Promise<LeadNote> {
  const { data } = await http.post<LeadNote>(ENDPOINTS.crmLeadNotes(id), { text });
  return data;
}

export async function addLeadTask(
  id: number | string,
  task: { title: string; dueAt: string; assigneeId?: string },
): Promise<LeadTask> {
  const { data } = await http.post<LeadTask>(ENDPOINTS.crmLeadTasks(id), task);
  return data;
}

export async function fetchOpenTasks(): Promise<LeadTask[]> {
  const { data } = await http.get<LeadTask[]>(ENDPOINTS.crmTasks);
  return data;
}

export async function updateTask(
  id: number | string,
  patch: { title?: string; dueAt?: string; done?: boolean },
): Promise<LeadTask> {
  const { data } = await http.patch<LeadTask>(ENDPOINTS.crmTask(id), patch);
  return data;
}

export async function deleteTask(id: number | string): Promise<void> {
  await http.delete(ENDPOINTS.crmTask(id));
}

export async function sendTelegramTest(): Promise<boolean> {
  const { data } = await http.post<{ sent: boolean }>(ENDPOINTS.crmTelegramTest);
  return data.sent;
}
