import { useMutation, useQuery } from "@tanstack/react-query";
import {
  cancelReservation,
  getAllReservations,
  getReservationById,
  getReservationsByUser,
} from "../services/reservationService";
import type { IReservation } from "../types/reservation.interface";

// Obtener todas las reservas
export const useReservations = () => 
  useQuery<IReservation[], Error>({
    queryKey: ["reservations"],
    queryFn: getAllReservations,
  });

// Obtener una reserva por ID
export const useReservationById = (id: number, enabled = true) => 
  useQuery<IReservation, Error>({
    queryKey: ["reservation", id],
    queryFn: () => getReservationById(id),
    enabled: enabled && id > 0,
  });

// Obtener reservas por usuario
export const useReservationsByUser = (userId: number, enabled = true) => 
  useQuery<IReservation[], Error>({
    queryKey: ["reservations", "user", userId],
    queryFn: () => getReservationsByUser(userId),
    enabled: enabled && userId > 0,
  });

// Cancelar reserva
export const useCancelReservation = () => {
  return useMutation<void, Error, { id: number }>({
    mutationFn: ({ id }) => cancelReservation(id),

    onError: (error, variables) => {
      console.error(`Falló la cancelación de la reserva ${variables.id}:`, error);
    },
  });
};