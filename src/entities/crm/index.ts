export type {
  CrmSummary,
  Lead,
  LeadDetail,
  LeadNote,
  LeadPatch,
  LeadTask,
} from "./model/crm.types";
export { DEPARTMENTS, DEPARTMENT_LABELS, KIND_LABELS, STAGE_TONE } from "./model/crm.constants";
export {
  addLeadNote,
  addLeadTask,
  deleteTask,
  fetchCrmSummary,
  fetchLead,
  fetchLeads,
  fetchOpenTasks,
  sendTelegramTest,
  updateLead,
  updateTask,
} from "./api/crm.api";
