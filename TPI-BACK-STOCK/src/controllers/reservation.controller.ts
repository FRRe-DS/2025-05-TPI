// src/controllers/ReservationController.ts

import { Request, Response, NextFunction } from 'express';
import { ReservationService } from '../services';
import { EstadoReserva, ReservaInput, ActualizarReservaInput, CancelacionReservaInput } from '../types/reservation'; // Cambiado a español

// --- Definición de Errores ---
class ResourceNotFoundError extends Error {} 

export class ReservationController {
  private reservationService: ReservationService;

  constructor(reservationService: ReservationService) {
    this.reservationService = reservationService;
  }

  getReservationsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const usuarioId = Number(req.query.usuarioId) || 12345; // Según contrato: query parameter
      
      if (!usuarioId) {
        res.status(400).json({ message: "El parámetro 'usuarioId' es requerido." });
        return;
      }

      const reservations = await this.reservationService.getReservationsByUserId(usuarioId);
      res.status(200).json(reservations);
    } catch (error) {
      next(error); 
    }
  }

  getReservationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idReserva = Number(req.params.idReserva);

      const reservation = await this.reservationService.getReservationById(idReserva);
      res.status(200).json(reservation);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        next(error); 
      }
    }
  }

  updateReservationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idReserva = parseInt(req.params.idReserva, 10);
      const input: ActualizarReservaInput = req.body; 

      if (!input.estado) {
        res.status(400).json({ message: "Los campos 'usuarioId' y 'estado' son requeridos." });
        return;
      }

      const updatedReservation = await this.reservationService.updateReservationStatus(
        idReserva, 
        input.estado
      );

      res.status(200).json(updatedReservation);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }

  cancelReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idReserva = Number(req.params.idReserva);
      const input: CancelacionReservaInput = req.body; 

      if (!input.motivo) {
        res.status(400).json({ message: "El campo 'motivo' es requerido." });
        return;
      }

      const result: boolean = await this.reservationService.cancelReservation(idReserva);

      if (result) {
        res.status(204).send(); // Cambiado a 204 según contrato
      } else {
        res.status(409).json({ message: `No se pudo cancelar la reserva ${idReserva}.` });
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
        res.status(400).json({ 
          message: "Los campos 'idCompra', 'usuarioId' y 'productos' son requeridos." 
        });
        return;
      }

      // Validar que productos sea un array no vacío
      if (!Array.isArray(input.productos) || input.productos.length === 0) {
        res.status(400).json({ 
          message: "El campo 'productos' debe ser un array con al menos un producto." 
        });
        return;
      }

      // Validar estructura de cada producto
      for (const producto of input.productos) {
        if (!producto.productoId || producto.cantidad === undefined) {
          res.status(400).json({ 
            message: "Cada producto debe tener 'productoId' y 'cantidad'." 
          });
          return;
        }

        if (producto.cantidad <= 0) {
          res.status(400).json({ 
            message: "La cantidad debe ser mayor a 0." 
          });
          return;
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