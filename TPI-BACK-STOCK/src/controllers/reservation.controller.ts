// src/controllers/ReservationController.ts

import { Request, Response, NextFunction } from 'express';
import { ReservationService } from '../services';
import { ReservationState } from '../types/reservation'; 

// --- Definición de Errores (Asumiendo que existen) ---
class ResourceNotFoundError extends Error {} 


export class ReservationController {
    
  private reservationService: ReservationService;

  constructor(reservationService: ReservationService) {
    this.reservationService = reservationService;
  }

  getReservationsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //const usuarioId = req.user.id; 
      const usuarioId = 12; // Temporal para pruebas
      const reservations = await this.reservationService.getReservationsByUserId(usuarioId);
      
      // 200 OK
      res.status(200).json(reservations);
    } catch (error) {
      // Se asume que cualquier error aquí es un 500 del servidor/DB
      next(error); 
    }
  }

  
  getReservationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idReserva = parseInt(req.params.id, 10);
      //const usuarioId = req.user.id; 
      const usuarioId = 12; // Temporal para pruebas

      // Se espera que el service lance ResourceNotFoundError si no encuentra la reserva
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
      const idReserva = parseInt(req.params.id, 10);
      //const usuarioId = req.user.id; 
      const usuarioId = 12; // Temporal para pruebas

      const estado: ReservationState = req.body.estado as ReservationState; 

      if (!estado) {
        res.status(400).json({ message: "El campo 'estado' es requerido." });
        return;
      }

      const updatedReservation = await this.reservationService.updateReservationStatus(
        idReserva, 
        usuarioId, 
        estado
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
      const idReserva = parseInt(req.params.id, 10);
      
      const result: boolean = await this.reservationService.cancelReservation(idReserva);

      if (result) {
        res.status(200).json({ 
          message: `Reserva ${idReserva} cancelada y stock liberado exitosamente.`,
          idReserva: idReserva
        });
      } else {
        res.status(409).json({ message: `No se pudo cancelar la reserva ${idReserva}. Verifique si la reserva es cancelable o si ya fue cancelada.` });
      }
    } catch (error) {
      next(error); 
    }
  }

  createReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
    
      const usuarioId = 12; // Temporal: Reemplazar con req.user.id
      data.userId = usuarioId; 
      
      const newReservation = await this.reservationService.createReservation(data);

      res.status(201).json(newReservation);

    } catch (error) {
      next(error); 
    }
  }
}