import { api } from "../client/axios";
import type { IReservation } from "../types/reservation.interface";

export const getAllReservations = async (): Promise<IReservation[]> => {
  try {
    const response = await api.get<IReservation[]>("/reservations");
    return response.data;
  } catch (error) {
    console.error("Error fetching all reservations:", error);
    throw error;
  }
};

export const getReservationById = async (id: number): Promise<IReservation> => {
  try {
    const response = await api.get<IReservation>(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservation with id ${id}:`, error);
    throw error;
  }
};


export const getReservationsByStatus = async (
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
): Promise<IReservation[]> => {
  try {
    const response = await api.get<IReservation[]>("/reservations", {
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
      `/reservations/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservations for user ${userId}:`, error);
    throw error;
  }
};

export const deleteReservation = async (id: number): Promise<void> => {
  try {
    await api.delete(`/reservations/${id}`);
  } catch (error) {
    console.error(`Error deleting reservation with id ${id}:`, error);
    throw error;
  }
};
