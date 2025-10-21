import { AppDataSource} from "../config/appDataSource";
import { Reservation } from "../models/entities";
import { ReservationItem } from "../models/entities";
import { Product } from "../models/entities";
import { ReservationRepository } from "../repository/reservationRepository";
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