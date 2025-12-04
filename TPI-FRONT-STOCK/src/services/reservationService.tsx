import { api } from "../client/axios";
import type { IReservation } from "../types/reservation.interface";

/**
 * Servicio para consumir la API de Reservas
 * Utiliza Axios configurado en client/axios.ts
 */

export const getAllReservations = async (): Promise<IReservation[]> => {
  try {
    const response = await api.get<IReservation[]>("/reservas");
    return response.data.reverse();
  } catch (error) {
    console.error("Error fetching all reservations:", error);
    throw error;
  }
};

export const getReservationById = async (id: number): Promise<IReservation> => {
  try {
    const response = await api.get<IReservation>(`/reservas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservation with id ${id}:`, error);
    throw error;
  }
};


export const getReservationsByUser = async (
  userId: number
): Promise<IReservation[]> => {
  try {
    const response = await api.get<IReservation[]>("/reservas", {
      params: { usuarioId: userId }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservations for user ${userId}:`, error);
    throw error;
  }
};

export const cancelReservation = async (
  reservationId: number
): Promise<void> => {
  try {
    await api.delete<IReservation[]>("/reservas", {
      params: { usuarioId: reservationId }
    });
  } catch (error) {
    console.error(`Error to cancel reservation for  ${reservationId}:`, error);
    throw error;
  }
};