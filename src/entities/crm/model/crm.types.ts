import type { Department } from "@/entities/agent";
import type { RequestKind } from "@/entities/request";
import type { RequestStatus } from "@/shared/constants/statuses";

/** A request as the CRM sees it: the enquiry plus pipeline and workload fields. */
export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  kind: RequestKind | "letting";
  message: string;
  status: RequestStatus;
  department?: Department | null;
  assigneeId?: string | null;
  assigneeName?: string | null;
  propertyId?: string | null;
  openTasks: number;
  overdueTasks: number;
  nextDueAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadNote {
  id: number;
  kind: "note" | "system";
  text: string;
  author: string;
  createdAt: string;
}

export interface LeadTask {
  id: number;
  leadId: number;
  leadName?: string | null;
  title: string;
  done: boolean;
  dueAt: string;
  assigneeId?: string | null;
  assigneeName?: string | null;
  createdAt: string;
}

export interface LeadDetail {
  lead: Lead;
  notes: LeadNote[];
  tasks: LeadTask[];
}

export interface CrmSummary {
  byStage: Record<RequestStatus, number>;
  unassigned: number;
  openTasks: number;
  overdueTasks: number;
  telegramEnabled: boolean;
}

/** Partial lead update; an empty `assigneeId` unassigns. */
export interface LeadPatch {
  status?: RequestStatus;
  assigneeId?: string;
  department?: Department;
}
