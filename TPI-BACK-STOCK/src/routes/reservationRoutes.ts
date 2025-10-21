import { Router } from "express";
import { container } from "../container/container";
import { ReservationController } from "../controllers/reservationController";

const reservationService = container.getReservationService();
const reservationController = new ReservationController(reservationService);

const router = Router();

// GET /v1/reservas - Listar reservas de un usuario
router.get("/", reservationController.getReservationsByUserId);

// GET /v1/reservas/:idReserva - Obtener una reserva específica
router.get("/:idReserva", reservationController.getReservationById);

// PATCH /v1/reservas/:idReserva - Actualizar estado de reserva
router.patch("/:idReserva", reservationController.updateReservationStatus);

// DELETE /v1/reservas/:idReserva - Cancelar reserva (libera stock)
router.delete("/:idReserva", reservationController.cancelReservation);

export default router;