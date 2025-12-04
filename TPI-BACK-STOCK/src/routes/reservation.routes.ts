import { Router } from "express";
import { container } from "../container/container";
import { requireAnyRole } from "../middleware/requireRole";

export const reservationRouter = Router();
const reservationController = container.reservationyController;

// GET /v1/reservas - Obtener todas las reservas o filtrar por usuarioId
// Fusionamos: Usamos la seguridad de tus compañeros + tu método del controlador
reservationRouter.get("/", 
    requireAnyRole(["stock-be", "compras-be", "logistica-be"]),
    reservationController.getReservations
);

// GET /v1/reservas/:idReserva - Obtener una reserva específica
reservationRouter.get("/:idReserva", 
    requireAnyRole(["stock-be", "compras-be", "logistica-be"]),
    reservationController.getReservationById
);

// PATCH /v1/reservas/:idReserva - Actualizar estado de reserva
reservationRouter.patch("/:idReserva", 
    requireAnyRole(["stock-be", "logistica-be"]),
    reservationController.updateReservationStatus
);

// DELETE /v1/reservas/:idReserva - Cancelar reserva (libera stock)
reservationRouter.delete("/:idReserva", 
    requireAnyRole(["stock-be", "compras-be", "logistica-be"]),
    reservationController.cancelReservation
);

// POST /v1/reservas - Crear una nueva reserva
reservationRouter.post("/", 
    requireAnyRole(["stock-be", "compras-be"]),
    reservationController.createReservation
);