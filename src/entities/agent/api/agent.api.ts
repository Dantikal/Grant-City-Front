import { isAxiosError } from "axios";
import { http } from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Agent } from "../model/agent.types";

/* ---------------- Reads ---------------- */

export async function fetchAgents(): Promise<Agent[]> {
  const { data } = await http.get<Agent[]>(ENDPOINTS.agents);
  return data;
}

export async function fetchAgent(idOrSlug: string): Promise<Agent | null> {
  try {
    const { data } = await http.get<Agent>(ENDPOINTS.agent(idOrSlug));
    return data ?? null;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
}

/* ---------------- Writes (admin) ---------------- */

export async function createAgent(agent: Agent): Promise<Agent> {
  const { data } = await http.post<Agent>(ENDPOINTS.agents, agent);
  return data ?? agent;
}

export async function updateAgent(agent: Agent): Promise<Agent> {
  const { data } = await http.put<Agent>(ENDPOINTS.agent(agent.id), agent);
  return data ?? agent;
}

export async function removeAgent(id: string): Promise<void> {
  await http.delete(ENDPOINTS.agent(id));
}
