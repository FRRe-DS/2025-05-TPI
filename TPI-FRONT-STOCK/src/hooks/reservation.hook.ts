import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllReservations,
  getReservationById,
  getReservationsByStatus,
  getReservationsByUser,
  deleteReservation,
} from "../services/reservationService";
import type { IReservation } from "../types/reservation.interface";

/**
 * Custom Hook para obtener todas las reservas
 */
export const useReservations = () => {
  return useQuery<IReservation[], Error>({
    queryKey: ["reservations"],
    queryFn: getAllReservations,
  });
};

/**
 * Hook para obtener una reserva por ID
 * @param id - ID de la reserva
 * @param enabled - Controla si la query debe ejecutarse
 */
export const useReservationById = (id: number, enabled = true) => {
  return useQuery<IReservation, Error>({
    queryKey: ["reservation", id],
    queryFn: () => getReservationById(id),
    enabled: enabled && id > 0, // Solo ejecuta si está habilitado y el ID es válido
  });
};

/**
 * Hook para obtener reservas por estado
 * @param status - Estado de la reserva (PENDING, CONFIRMED, CANCELLED)
 * @param enabled - Controla si la query debe ejecutarse
 */
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

/**
 * Hook para obtener reservas por usuario
 * @param userId - ID del usuario
 * @param enabled - Controla si la query debe ejecutarse
 */
export const useReservationsByUser = (userId: number, enabled = true) => {
  return useQuery<IReservation[], Error>({
    queryKey: ["reservations", "user", userId],
    queryFn: () => getReservationsByUser(userId),
    enabled: enabled && userId > 0,
  });
};

/**
 * Hook para eliminar una reserva
 * Invalida automáticamente el cache de reservas después de eliminar
 */
export const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con reservas
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
    onError: (error: Error) => {
      console.error("Error al eliminar la reserva:", error);
    },
  });
};
