import { AppDataSource} from "../config/appDataSource";
import { Reservation } from "../models/entities";
import { ReservationItem } from "../models/entities";
import { Product } from "../models/entities";
import { ReservationRepository } from "../repository";
import { ReservaInput, GetReservationsFilters, ReservationState } from "../types/reservation";

interface ReservaOutput {
  idReserva: number;
  idCompra: string;
  usuarioId: number;
  estado: string;
  expiresAt: Date;
  fechaCreacion: Date;
  fechaActualizacion?: Date;
  productos: {
      idProducto: number;
      nombre: string;
      cantidad: number;
      precioUnitario: number;
  }[];
}

export class ReservationService {
  
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async getAllReservations(): Promise<Reservation[]> {
    try{
      const reservation = await this.reservationRepository.findAll();
      if (!reservation) {
        throw new Error("Reservas no encontradas");
      }
      return reservation;
    } catch(error){
      console.error("Error al obtener las reservas:", error);
      throw error;
    }
  }

  async getReservationsByUserId(usuarioId: number): Promise<Reservation[]> {
    try{
      const reservation = await this.reservationRepository.findByUserId(usuarioId);
      if (!reservation) {
        throw new Error("Reservas no encontradas");
      }
      return reservation;
    } catch(error){
      console.error("Error al obtener las reservas:", error);
      throw error;
    }
  }
      
          

  async getReservationById (idReserva: number, usuarioId: number): Promise<Partial<Reservation>> {
    try{
      const reservation = await this.reservationRepository.findByUserReservation(idReserva, usuarioId);
      if (!reservation) {
        throw new Error("Reserva no encontrada");
      }

      return reservation;
    } catch(error){
      console.error("Error al obtener la reserva:", error);
      throw error;
    }
  }

  async updateReservationStatus(idReserva: number,usuarioId: number, estado: ReservationState): Promise<Partial<Reservation> | null > {
    try{  
      let reservation = await this.reservationRepository.findByUserReservation(idReserva, usuarioId);

      if (!reservation) throw new Error("Reserva no encontrada");

      reservation.state = estado;
    
      const updatedReservation = await this.reservationRepository.update(reservation.id, { state: estado });

      const finalReservation = await this.reservationRepository.findByUserReservation(reservation.id, usuarioId);

      if (!finalReservation) throw new Error("Error al obtener la reserva actualizada"); 

      return(finalReservation)
    } catch(error){
      console.error("Error al actualizar la reserva:", error);
      throw error;
    }
  }

  async cancelReservation(idReserva: number): Promise<boolean> {
    try{
      const result = await this.reservationRepository.cancelReservation(idReserva);
      return result;
    } catch(error){
      console.error("Error al cancelar la reserva:", error);
      throw error;
    }
  }
}
