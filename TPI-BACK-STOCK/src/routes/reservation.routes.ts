import { Router } from "express";
import { container } from "../container/container";

const reservationController = container.reservationyController;

const router = Router();

// POST /v1/reservas - cREAR UNA NUEVA RESERVA
router.post("/", reservationController.createReservation);

export default router;