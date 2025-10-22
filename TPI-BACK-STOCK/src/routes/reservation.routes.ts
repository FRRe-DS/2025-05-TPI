import { Router } from "express";
import { container } from "../container/container";

const ReservationRouter = Router();
const reservationController = container.reservationyController;

// GET /v1/reservas - Listar reservas de un usuario
ReservationRouter.get("/", reservationController.getReservationsByUserId);

// GET /v1/reservas/:idReserva - Obtener una reserva específica
ReservationRouter.get("/:idReserva", reservationController.getReservationById);

// PATCH /v1/reservas/:idReserva - Actualizar estado de reserva
ReservationRouter.patch("/:idReserva", reservationController.updateReservationStatus);

// DELETE /v1/reservas/:idReserva - Cancelar reserva (libera stock)
ReservationRouter.delete("/:idReserva", reservationController.cancelReservation);

export default ReservationRouter;