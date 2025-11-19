import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Mantener datos en cache por 1 minutos
      staleTime: 60 * 1000, // 1 minutos
      // Mantener cache por 3 minutos
      gcTime: 3 * 60 * 1000, // 3 minutos 
      // No refetch automático al volver a la ventana
      refetchOnWindowFocus: false,
      // No refetch al montar si los datos no están stale
      refetchOnMount: false,
      // Reintentar solo 1 vez en caso de error
      retry: 1,
    },
  },
});