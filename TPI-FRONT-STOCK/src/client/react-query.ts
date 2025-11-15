import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Mantener datos en cache por 10 minutos
      staleTime: 10 * 60 * 1000, // 10 minutos
      // Mantener cache por 15 minutos
      gcTime: 15 * 60 * 1000, // 15 minutos 
      // No refetch automático al volver a la ventana
      refetchOnWindowFocus: false,
      // No refetch al montar si los datos no están stale
      refetchOnMount: false,
      // Reintentar solo 1 vez en caso de error
      retry: 1,
    },
  },
});