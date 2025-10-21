import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllReservations,
  getReservationById,
  getReservationsByStatus,
  getReservationsByUser,
  deleteReservation,
} from "../services/reservationService";
import type { IReservation } from "../types/reservation.interface";

export const useReservations = () => {
  return useQuery<IReservation[], Error>({
    queryKey: ["reservations"],
    queryFn: getAllReservations,
  });
};

export const useReservationById = (id: number, enabled = true) => {
  return useQuery<IReservation, Error>({
    queryKey: ["reservation", id],
    queryFn: () => getReservationById(id),
    enabled: enabled && id > 0, // Solo ejecuta si está habilitado y el ID es válido
  });
};

export const useReservationsByStatus = (
  status: "PENDING" | "CONFIRMED" | "CANCELLED",
  enabled = true
) => {
  return useQuery<IReservation[], Error>({
    queryKey: ["reservations", "status", status],
    queryFn: () => getReservationsByStatus(status),
    enabled: enabled && !!status,
  });
};

export const useReservationsByUser = (userId: number, enabled = true) => {
  return useQuery<IReservation[], Error>({
    queryKey: ["reservations", "user", userId],
    queryFn: () => getReservationsByUser(userId),
    enabled: enabled && userId > 0,
  });
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
    onError: (error: Error) => {
      console.error("Error al eliminar la reserva:", error);
    },
  });
};
