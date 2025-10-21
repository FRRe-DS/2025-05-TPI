// src/controllers/ReservationController.ts

import { Request, Response, NextFunction } from 'express';
import { ReservationService } from '../services/reservation.service';
import { ReservationState } from '../types/reservation'; 

// --- Definición de Errores (Asumiendo que existen) ---
class ResourceNotFoundError extends Error {} 


export class ReservationController {
    
  private reservationService: ReservationService;

  constructor(reservationService: ReservationService) {
    this.reservationService = reservationService;
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