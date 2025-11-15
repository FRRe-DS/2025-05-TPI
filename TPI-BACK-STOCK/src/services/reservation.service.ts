import { Reservation } from "../models/entities";
import { ReservationRepository } from "../repository";
import { ReservaInput, EstadoReserva } from "../types";

export class ReservationService {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async getAllReservations(): Promise<Reservation[]> {
    try {
      const reservation = await this.reservationRepository.findAll(); 
      if (!reservation) {
        throw new Error("Reservas no encontradas");
      }
      return reservation;
    } catch(error) {
      console.error("Error al obtener las reservas:", error);
      throw error;
    }
  }

  async getReservationsByUserId(usuarioId: number): Promise<Reservation[]> {
    try {
      const reservation = await this.reservationRepository.findByUserId(usuarioId);
      if (!reservation) {
        throw new Error("Reservas no encontradas");
      }
      return reservation;
    } catch(error) {
      console.error("Error al obtener las reservas:", error);
      throw error;
    }
  }

  async getReservationById(idReserva: number): Promise<Partial<Reservation>> {
    try {
      const reservation = await this.reservationRepository.findByUserReservation(idReserva);
      if (!reservation) {
        throw new Error("Reserva no encontrada");
      }
      return reservation;
    } catch(error) {
      console.error("Error al obtener la reserva:", error);
      throw error;
    }
  }

  async updateReservationStatus(idReserva: number, estado: EstadoReserva): Promise<Partial<Reservation> | null> {
    try {  
      let reservation = await this.reservationRepository.findByUserReservation(idReserva);
      if (!reservation) throw new Error("Reserva no encontrada");

      reservation.estado = estado;
    
      const updatedReservation = await this.reservationRepository.update(reservation.idReserva, { estado: estado }); 

      const finalReservation = await this.reservationRepository.findByUserReservation(reservation.idReserva);
      if (!finalReservation) throw new Error("Error al obtener la reserva actualizada"); 

      return finalReservation;
    } catch(error) {
      console.error("Error al actualizar la reserva:", error);
      throw error;
    }
  }

  async cancelReservation(idReserva: number): Promise<boolean> {
    try {
      const result = await this.reservationRepository.cancelReservation(idReserva);
      return result;
    } catch(error) {
      console.error("Error al cancelar la reserva:", error);
      throw error;
    }
  }

  async createReservation(data: ReservaInput): Promise<Partial<Reservation>> {
    try {
      const savedReservation = await this.reservationRepository.createReservation(data);
      return savedReservation;
    } catch(error) {
      console.error("Error al crear la reserva:", error);
      
      if (error instanceof Error && error.message.includes("PRODUCT_STOCK_ERROR")) {
        throw new Error(`Conflicto de Stock: No se pudo completar la reserva debido a stock insuficiente. Detalles: ${error.message}`);
      }
    
      throw error; 
    }
  }
}