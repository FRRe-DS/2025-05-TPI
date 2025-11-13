import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,        // 5 minutos
      gcTime: 1000 * 60 * 10,          // 10 minutos (reemplaza cacheTime en v5)
      retry: 2,                         // 2 reintentos
      refetchOnWindowFocus: true,       // Re-fetch al volver a la ventana
      refetchOnReconnect: true,         // Re-fetch al reconectar internet
      refetchOnMount: true,             // Re-fetch al montar componente si los datos están stale
    },
    mutations: {
      retry: 1,                         // 1 reintento en mutations
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});