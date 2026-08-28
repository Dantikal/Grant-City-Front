import { QueryClient, isServer } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/** One client per request on the server, a singleton in the browser. */
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export const queryKeys = {
  properties: (filters?: unknown) => ["properties", filters ?? null] as const,
  property: (id: string) => ["property", id] as const,
  agents: () => ["agents"] as const,
  agent: (id: string) => ["agent", id] as const,
  services: () => ["services"] as const,
  certificates: () => ["certificates"] as const,
  presentations: () => ["presentations"] as const,
  favorites: () => ["favorites"] as const,
  requests: () => ["requests"] as const,
};
