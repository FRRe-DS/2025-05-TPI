import { Router } from "express";
import {
  createReservationHandler,
  getReservationByIdHandler,
  getUserReservationsHandler,
  updateReservationHandler,
  cancelReservationHandler,
} from "../controllers/reservationController";

const router = Router();

// GET /v1/reservas - Listar reservas de un usuario
router.get("/", getUserReservationsHandler);

// POST /v1/reservas - Crear una nueva reserva
router.post("/", createReservationHandler);

// GET /v1/reservas/:idReserva - Obtener una reserva específica
router.get("/:idReserva", getReservationByIdHandler);

// PATCH /v1/reservas/:idReserva - Actualizar estado de reserva
router.patch("/:idReserva", updateReservationHandler);

// DELETE /v1/reservas/:idReserva - Cancelar reserva (libera stock)
router.delete("/:idReserva", cancelReservationHandler);

export default router;