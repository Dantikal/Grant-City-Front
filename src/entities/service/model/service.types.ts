export interface Service {
  id: string;
  no: string;
  slug: string;
  title: string;
  body: string;
  longBody: string;
  points: string[];
}

export interface Department {
  id: string;
  /** Ids of the services this department handles. */
  services: string[];
}
