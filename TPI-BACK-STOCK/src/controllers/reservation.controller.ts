// src/controllers/reservation.controller.ts
import { Router } from "express";
import { crearReserva } from "../services/reservation.service.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { userId, items } = req.body;
    const data = await crearReserva({ userId: Number(userId), items });
    return res.status(201).json(data);
  } catch (e: any) {
    if (e?.name === "ValidationError") return res.status(422).json({ error: e.message });
    if (e?.name === "ConflictError")   return res.status(409).json({ error: e.message });
    return next(e);
  }
});

export default router;
