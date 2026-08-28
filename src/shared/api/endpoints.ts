/** REST endpoint paths, relative to the Axios baseURL (env.API_URL). */
export const ENDPOINTS = {
  // auth
  login: "/auth/login",
  me: "/auth/me",

  // catalog
  properties: "/properties",
  property: (id: string) => `/properties/${id}`,
  agents: "/agents",
  agent: (id: string) => `/agents/${id}`,
  services: "/services",
  service: (id: string) => `/services/${id}`,

  // documents (About → Documents)
  certificates: "/certificates",
  certificate: (id: string) => `/certificates/${id}`,
  certificatesOrder: "/certificates/order",
  presentations: "/presentations",
  presentation: (lang: string) => `/presentations/${lang}`,

  // leads
  bookings: "/bookings",
  requests: "/requests",
  request: (id: number | string) => `/requests/${id}`,

  // media
  uploads: "/uploads",
} as const;
