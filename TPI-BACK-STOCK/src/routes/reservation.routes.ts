import { Router } from "express";
import { container } from "../container/container";

<<<<<<< HEAD
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
=======
const reservationController = container.reservationyController;

const router = Router();

// POST /v1/reservas - cREAR UNA NUEVA RESERVA
router.post("/", reservationController.createReservation);

export default router;
>>>>>>> 18ce5ecf38c531c4c7798ae816adc74eb4ae4fe0
