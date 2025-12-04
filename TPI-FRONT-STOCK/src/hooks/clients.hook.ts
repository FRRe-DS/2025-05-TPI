import { useQuery } from "@tanstack/react-query";
import { getClientsFromReservations, type IClientSummary } from "../services/clientsService";

export const useClients = () => {
  return useQuery<IClientSummary[], Error>({
    queryKey: ["clients"],
    queryFn: getClientsFromReservations,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};