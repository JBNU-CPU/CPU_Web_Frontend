import {QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: false,
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    },
    mutations: {
      // retry: false,
    },
  },
});
