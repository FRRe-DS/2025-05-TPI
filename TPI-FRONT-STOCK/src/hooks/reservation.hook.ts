import { useQuery } from "@tanstack/react-query";
import {
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