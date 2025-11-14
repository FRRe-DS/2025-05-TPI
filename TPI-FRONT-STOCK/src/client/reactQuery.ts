import { QueryClient } from "@tanstack/react-query";

/**
 * Vi que todos los hooks de React Query utilizan este cliente global
 * 
 * Configuración por defecto para todas las queries:
 * - staleTime: 5 minutos - Tiempo que los datos se consideran "frescos"
 * - gcTime: 10 minutos - Tiempo que los datos permanecen en cache
 * - retry: 2 - Número de reintentos automáticos si falla una petición
 * - refetchOnWindowFocus: true - Re-fetch al volver a la ventana
 * - refetchOnReconnect: true - Re-fetch al reconectar internet
 */
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