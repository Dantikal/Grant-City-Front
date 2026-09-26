import type { Department } from "@/entities/agent";

export const DEPARTMENTS: Department[] = ["valuation", "planning", "sales"];

export const DEPARTMENT_LABELS: Record<Department, string> = {
  valuation: "Отдел оценки",
  planning: "Отдел бизнес-планирования",
  sales: "Отдел купли-продажи",
};

export const KIND_LABELS: Record<string, string> = {
  general: "Общий вопрос",
  viewing: "Запись на просмотр",
  valuation: "Оценка",
  "business-plan": "Бизнес-план",
  sales: "Купля-продажа",
  letting: "Аренда",
};

/** Accent colour per stage, used for the board column headers and badges. */
export const STAGE_TONE: Record<string, string> = {
  new: "bg-sky-500",
  "in-progress": "bg-amber-500",
  meeting: "bg-violet-500",
  contract: "bg-indigo-500",
  won: "bg-emerald-500",
  lost: "bg-zinc-400",
};
