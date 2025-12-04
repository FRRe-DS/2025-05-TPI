// src/controllers/ReservationController.ts

import { Request, Response, NextFunction } from 'express';
import { ReservationService } from '../services';
import { ReservaInput, ActualizarReservaInput, CancelacionReservaInput } from '../types/reservation'; 
import { AppError } from '../utils/AppError'; // <--- Importante

export class ReservationController {
  private reservationService: ReservationService;

  constructor(reservationService: ReservationService) {
    this.reservationService = reservationService;
  }

  getReservations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const usuarioId = req.query.usuarioId ? Number(req.query.usuarioId) : undefined;

      // Si viene usuarioId, filtrar por usuario
      if (usuarioId !== undefined) {
        if (isNaN(usuarioId)) {
          return next(new AppError("El parámetro 'usuarioId' debe ser un número válido.", 400, "INVALID_ID"));
        }
        const userReservations = await this.reservationService.getReservationsByUserId(usuarioId);
        res.status(200).json(userReservations);
      } 
      // Si no viene usuarioId, retornar todas las reservas
      else {
        const allReservations = await this.reservationService.getAllReservations();
        res.status(200).json(allReservations);
      }
    } catch (error) {
      next(error);
    }
  }

  // Método para obtener reserva por ID
  getReservationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idReserva = Number(req.params.idReserva);

      if (isNaN(idReserva)) {
        return next(new AppError("El ID de reserva debe ser un número válido.", 400, "INVALID_ID"));
      }

      const reservation = await this.reservationService.getReservationById(idReserva);
      
      if (!reservation) {
        return next(new AppError("Reserva no encontrada", 404, "RESERVATION_NOT_FOUND", `No existe reserva con ID ${idReserva}`));
      }

      res.status(200).json(reservation);
    } catch (error: any) {
      // Si el servicio lanza un error específico de no encontrado
      if (error.message && (error.message.includes("not found") || error.name === 'ResourceNotFoundError')) {
         return next(new AppError(error.message, 404, 'RESERVATION_NOT_FOUND'));
      }
      next(error); 
    }
  }

  updateReservationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idReserva = parseInt(req.params.idReserva, 10);
      const input: ActualizarReservaInput = req.body; 

      if (!input.estado) {
         return next(new AppError("Los campos 'usuarioId' y 'estado' son requeridos.", 400, "INVALID_DATA"));
      }
      
      if (isNaN(idReserva)) {
        return next(new AppError("ID de reserva inválido", 400, "INVALID_ID"));
      }

      const updatedReservation = await this.reservationService.updateReservationStatus(
        idReserva, 
        input.estado
      );

      res.status(200).json(updatedReservation);
    } catch (error: any) {
      if (error.message && (error.message.includes("not found") || error.name === 'ResourceNotFoundError')) {
        return next(new AppError(error.message, 404, 'RESERVATION_NOT_FOUND'));
     }
      next(error);
    }
  }

  cancelReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idReserva = Number(req.params.idReserva);
      const input: CancelacionReservaInput = req.body; 

      if (!input.motivo) {
        return next(new AppError("El campo 'motivo' es requerido.", 400, "INVALID_DATA"));
      }
      
      if (isNaN(idReserva)) {
        return next(new AppError("ID de reserva inválido", 400, "INVALID_ID"));
      }

      const result: boolean = await this.reservationService.cancelReservation(idReserva);

      if (result) {
        res.status(204).send(); 
      } else {
        // Transformamos el 409 original a AppError
        return next(new AppError(`No se pudo cancelar la reserva ${idReserva}.`, 409, "CONFLICT_ERROR"));
      }
    } catch (error) {
      next(error); 
    }
  }

  createReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input: ReservaInput = req.body;

      // Validar campos requeridos según contrato
      if (!input.idCompra || !input.usuarioId || !input.productos) {
        return next(new AppError(
            "Los campos 'idCompra', 'usuarioId' y 'productos' son requeridos.",
            400,
            "INVALID_DATA"
        ));
      }

      // Validar que productos sea un array no vacío
      if (!Array.isArray(input.productos) || input.productos.length === 0) {
        return next(new AppError(
            "El campo 'productos' debe ser un array con al menos un producto.",
            400,
            "INVALID_DATA"
        ));
      }

      // Validar estructura de cada producto
      for (const producto of input.productos) {
        if (!producto.productoId || producto.cantidad === undefined) {
          return next(new AppError("Cada producto debe tener 'productoId' y 'cantidad'.", 400, "INVALID_DATA"));
        }

        if (producto.cantidad <= 0) {
          return next(new AppError("La cantidad debe ser mayor a 0.", 400, "INVALID_DATA"));
        }
      }

      console.log("DATA RESERVATION CONTROLLER: ", input);
      const newReservation = await this.reservationService.createReservation(input);
      res.status(201).json(newReservation);
    } catch (error) {
      next(error); 
    }
  }
}