import { useQuery } from "@tanstack/react-query";
// import { useMutation, useQueryClient } from "@tanstack/react-query"; // Para cuando implementes DELETE
import {
  getAllReservations,
  getReservationById,
  getReservationsByStatus,
  getReservationsByUser,
  // deleteReservation, // ⚠️ Comentado: endpoint no implementado en backend
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
 * @param status - Estado de la reserva (PENDING, CONFIRMED, CANCELED)
 * @param enabled - Controla si la query debe ejecutarse
 */
export const useReservationsByStatus = (
  status: "PENDING" | "CONFIRMED" | "CANCELED",
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
 * ⚠️ Hook para eliminar una reserva - DESHABILITADO
 * El endpoint DELETE no está implementado en el backend actual
 * Descomenta cuando implementes el endpoint en el backend
 */
/*
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
*/
