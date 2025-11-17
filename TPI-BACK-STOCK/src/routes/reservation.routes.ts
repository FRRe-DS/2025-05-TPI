import { Router } from "express";
import { container } from "../container/container";
import { keycloak } from "../config/keycloak";

export const reservationRouter = Router();
const reservationController = container.reservationyController;

// GET /v1/reservas - Listar reservas de un usuario
reservationRouter.get("/", 
    keycloak.protect("reservas:read"),
    reservationController.getReservationsByUserId);

// GET /v1/reservas/:idReserva - Obtener una reserva específica
reservationRouter.get("/:idReserva", 
    keycloak.protect("reservas:read"),
    reservationController.getReservationById);

// PATCH /v1/reservas/:idReserva - Actualizar estado de reserva
reservationRouter.patch("/:idReserva", 
    keycloak.protect("reservas:write"),
    reservationController.updateReservationStatus);

// DELETE /v1/reservas/:idReserva - Cancelar reserva (libera stock)
reservationRouter.delete("/:idReserva", 
    keycloak.protect("reservas:write"),
    reservationController.cancelReservation);

// POST /v1/reservas - Crear una nueva reserva
reservationRouter.post("/", 
    keycloak.protect("reservas:write"),
    reservationController.createReservation);
