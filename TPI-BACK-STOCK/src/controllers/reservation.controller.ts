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
      const usuarioId = Number(req.query.usuarioId); // Según contrato: query parameter

      if (!usuarioId) {
        res.status(400).json({ message: "El parámetro 'usuarioId' es requerido." });
        return;
      }

      const reservation = await this.reservationService.getReservationById(idReserva, usuarioId);
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
      const idReserva = parseInt(req.params.idReserva, 10); // Cambiado a idReserva
      const input: ActualizarReservaInput = req.body; // Usar interfaz en español

      if (!input.usuarioId || !input.estado) {
        res.status(400).json({ message: "Los campos 'usuarioId' y 'estado' son requeridos." });
        return;
      }

      const updatedReservation = await this.reservationService.updateReservationStatus(
        idReserva, 
        input.usuarioId, 
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
      const input: CancelacionReservaInput = req.body; // Usar interfaz en español

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
      const input: ReservaInput = req.body; // Usar interfaz en español
    
      // Validar campos requeridos según contrato
      if (!input.idCompra || !input.usuarioId || !input.productos) {
        res.status(400).json({ message: "Los campos 'idCompra', 'usuarioId' y 'productos' son requeridos." });
        return;
      }

      console.log("DATA RESERVATION CONTROLLER: ", input);
      const newReservation = await this.reservationService.createReservation(input);
      res.status(201).json(newReservation);
    } catch (error) {
      next(error); 
    }
  }
}