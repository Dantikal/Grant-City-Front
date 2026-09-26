export interface Agent {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  longBio: string;
  photo: string;
  email: string;
  phone: string;
  specialties: string[];
  areas: string[];
  salesCount: number;
  rating: number;
  since: number;
  /** valuation | planning | sales — CRM leads are routed by it. */
  department?: Department | null;
}

export type Department = "valuation" | "planning" | "sales";
