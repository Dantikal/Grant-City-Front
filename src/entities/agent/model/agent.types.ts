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
}
