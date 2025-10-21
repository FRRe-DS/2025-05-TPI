import { Router } from "express";
import { container } from "../container/container";
import { ReservationController } from "../controllers/reservation.controller";

const reservationService = container.getReservationService();
const reservationController = new ReservationController(reservationService);

const router = Router();

// POST /v1/reservas - cREAR UNA NUEVA RESERVA
router.post("/", reservationController.createReservation);

export default router;