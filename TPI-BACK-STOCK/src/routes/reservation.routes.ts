import { Router } from "express";
import { container } from "../container/container";

export const reservationRouter = Router();
const reservationController = container.reservationyController;

// GET /v1/reservas - Listar reservas de un usuario
reservationRouter.get("/", reservationController.getReservationsByUserId);

// GET /v1/reservas/:idReserva - Obtener una reserva específica
reservationRouter.get("/:idReserva", reservationController.getReservationById);

// PATCH /v1/reservas/:idReserva - Actualizar estado de reserva
reservationRouter.patch("/:idReserva", reservationController.updateReservationStatus);

// DELETE /v1/reservas/:idReserva - Cancelar reserva (libera stock)
reservationRouter.delete("/:idReserva", reservationController.cancelReservation);

// POST /v1/reservas - Crear una nueva reserva
reservationRouter.post("/", reservationController.createReservation);
