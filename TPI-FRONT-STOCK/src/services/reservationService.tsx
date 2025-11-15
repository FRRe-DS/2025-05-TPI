import { api } from "../client/axios";
import type { IReservation } from "../types/reservation.interface";

/**
 * Servicio para consumir la API de Reservas
 * Utiliza Axios configurado en client/axios.ts
 */

export const getAllReservations = async (): Promise<IReservation[]> => {
  try {
    const response = await api.get<IReservation[]>("/reservas");
    return response.data;
  } catch (error) {
    console.error("Error fetching all reservations:", error);
    throw error;
  }
};

// Siempre enviando el usuarioId 12345 como query param para que funcione
export const getReservationById = async (id: number): Promise<IReservation> => {
  try {
    const response = await api.get<IReservation>(`/reservas/${id}`, {
      params: { usuarioId: 12345 }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservation with id ${id}:`, error);
    throw error;
  }
};


export const getReservationsByStatus = async (
  status: "PENDING" | "CONFIRMED" | "CANCELED"
): Promise<IReservation[]> => {
  try {
    const response = await api.get<IReservation[]>("/reservas", {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservations with status ${status}:`, error);
    throw error;
  }
};


export const getReservationsByUser = async (
  userId: number
): Promise<IReservation[]> => {
  try {
    const response = await api.get<IReservation[]>(
      `/reservas/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservations for user ${userId}:`, error);
    throw error;
  }
};