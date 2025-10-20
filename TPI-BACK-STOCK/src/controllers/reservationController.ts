import { Request, Response } from "express";
import {
  createReservation,
  getReservationById,
  getUserReservations,
  updateReservationStatus,
  cancelReservation,
} from "../services/reservationService";
import { ReservaInput, ActualizarReservaInput, CancelacionReservaInput } from "../types/reservation";

export const createReservationHandler = async (req: Request, res: Response) => {
  try {
    const data: ReservaInput = req.body;
    const reservation = await createReservation(data);
    res.status(201).json(reservation);
  } catch (error: any) {
    if (error.message.includes("Stock insuficiente")) {
      return res.status(400).json({
        code: "INSUFFICIENT_STOCK",
        message: error.message,
      });
    }
    if (error.message.includes("Producto no encontrado")) {
      return res.status(404).json({
        code: "PRODUCT_NOT_FOUND",
        message: error.message,
      });
    }
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Error al crear la reserva",
      details: error.message,
    });
  }
};

export const getReservationByIdHandler = async (req: Request, res: Response) => {
  try {
    const idReserva = parseInt(req.params.idReserva);
    const usuarioId = req.query.usuarioId ? parseInt(req.query.usuarioId as string) : undefined;

    if (!usuarioId) {
      return res.status(400).json({
        code: "MISSING_USER_ID",
        message: "El parámetro usuarioId es requerido",
      });
    }

    const reservation = await getReservationById(idReserva, usuarioId);

    if (!reservation) {
      return res.status(404).json({
        code: "RESERVATION_NOT_FOUND",
        message: "Reserva no encontrada",
      });
    }

    res.status(200).json(reservation);
  } catch (error: any) {
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Error al obtener la reserva",
      details: error.message,
    });
  }
};

export const getUserReservationsHandler = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.query.usuarioId ? parseInt(req.query.usuarioId as string) : undefined;
    const estadoQuery = req.query.estado as string | undefined;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (!usuarioId) {
      return res.status(400).json({
        code: "MISSING_USER_ID",
        message: "El parámetro usuarioId es requerido",
      });
    }

    const validStates = ["confirmado", "pendiente", "cancelado"] as const;
    let estado: 'confirmado' | 'pendiente' | 'cancelado' | undefined = undefined;
    if (estadoQuery) {
      if (!validStates.includes(estadoQuery as any)) {
        return res.status(400).json({
          code: "INVALID_STATE",
          message: "Estado inválido. Debe ser: confirmado, pendiente o cancelado",
        });
      }
      estado = estadoQuery as 'confirmado' | 'pendiente' | 'cancelado';
    }

    const reservations = await getUserReservations({
      usuarioId,
      estado,
      page,
      limit,
    });

    res.status(200).json(reservations);
  } catch (error: any) {
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Error al obtener las reservas",
      details: error.message,
    });
  }
};

export const updateReservationHandler = async (req: Request, res: Response) => {
  try {
    const idReserva = parseInt(req.params.idReserva);
    const { usuarioId, estado }: ActualizarReservaInput = req.body;

    if (!usuarioId || !estado) {
      return res.status(400).json({
        code: "INVALID_DATA",
        message: "Los campos usuarioId y estado son requeridos",
      });
    }

    const validStates = ["confirmado", "pendiente", "cancelado"];
    if (!validStates.includes(estado)) {
      return res.status(400).json({
        code: "INVALID_STATE",
        message: "Estado inválido. Debe ser: confirmado, pendiente o cancelado",
      });
    }

    const reservation = await updateReservationStatus(idReserva, usuarioId, estado);

    if (!reservation) {
      return res.status(404).json({
        code: "RESERVATION_NOT_FOUND",
        message: "Reserva no encontrada",
      });
    }

    res.status(200).json(reservation);
  } catch (error: any) {
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Error al actualizar la reserva",
      details: error.message,
    });
  }
};

export const cancelReservationHandler = async (req: Request, res: Response) => {
  try {
    const idReserva = parseInt(req.params.idReserva);
    const { motivo }: CancelacionReservaInput = req.body;

    if (!motivo) {
      return res.status(400).json({
        code: "MISSING_REASON",
        message: "El motivo de cancelación es requerido",
      });
    }

    const result = await cancelReservation(idReserva, motivo);

    if (!result) {
      return res.status(404).json({
        code: "RESERVATION_NOT_FOUND",
        message: "Reserva no encontrada",
      });
    }

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Error al cancelar la reserva",
      details: error.message,
    });
  }
};