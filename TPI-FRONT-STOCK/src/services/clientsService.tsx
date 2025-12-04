import { api } from "../client/axios";
import type { IReservation } from "../types/reservation.interface";

export interface IClientSummary {
  id: number;
  lastPurchase?: string;
}

/**
 * Obtiene un resumen de todos los clientes únicos desde las reservas
 */
export async function getClientsFromReservations(): Promise<IClientSummary[]> {
  try {
    const response = await api.get<IReservation[]>('/reservas');
    const reservations = response.data;

    // Agrupar por usuarioId y obtener la fecha más reciente
    const clientMap = new Map<number, string>();

    reservations.forEach(reservation => {
      const userId = reservation.usuarioId;
      const currentDate = reservation.fechaCreacion; // ✅ Corregido: era 'fecha' → 'fechaCreacion'

      if (!clientMap.has(userId)) {
        clientMap.set(userId, currentDate);
      } else {
        const existingDate = clientMap.get(userId)!;
        // Comparar fechas y mantener la más reciente
        if (new Date(currentDate) > new Date(existingDate)) {
          clientMap.set(userId, currentDate);
        }
      }
    });

    // Convertir a array de IClientSummary y ordenar por ID
    return Array.from(clientMap.entries())
      .map(([id, lastPurchase]) => ({
        id,
        lastPurchase
      }))
      .sort((a, b) => a.id - b.id); // Ordenar por ID ascendente

  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
}