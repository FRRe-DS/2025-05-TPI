// src/services/reservation.service.ts
import { AppDataSource } from "../config/appDataSource.js";
import { Product } from "../models/Product.entity.js";
import { Reservation, ReservationStatus } from "../models/Reservation.entity.js";
import { ReservationItem } from "../models/ReservationItem.entity.js";
import { ConflictError, ValidationError } from "../shared/errors.js";

export async function crearReserva({
  userId,
  items,
}: {
  userId: number;
  items: { productId: number; quantity: number }[];
}) {
  if (!userId || !Array.isArray(items) || items.length === 0) {
    throw new ValidationError("DATOS_INVALIDOS");
  }

  const qr = AppDataSource.createQueryRunner();
  await qr.connect();
  await qr.startTransaction();

  try {
    // usa repositorio para evitar el error de overload
    const reservationRepo = qr.manager.getRepository(Reservation);

    const reservation = reservationRepo.create({
      userId,
      status: ReservationStatus.PENDING, // <-- enum, no string
      totalQuantity: 0,
    });
    await reservationRepo.save(reservation);

    let totalQuantity = 0;

    for (const item of items) {
      const product = await qr.manager.findOne(Product, {
        where: { id: item.productId },
        lock: { mode: "pessimistic_write" },
      });
      if (!product) throw new ValidationError("PRODUCTO_INEXISTENTE");
      if (!Number.isInteger(item.quantity) || item.quantity <= 0)
        throw new ValidationError("CANTIDAD_INVALIDA");
      if (product.availableStock < item.quantity)
        throw new ConflictError("STOCK_INSUFICIENTE");

      product.availableStock -= item.quantity;
      await qr.manager.save(product);

      const ri = qr.manager.create(ReservationItem, {
        reservationId: reservation.id,
        productId: product.id,
        quantity: item.quantity,
      });
      await qr.manager.save(ri);

      totalQuantity += item.quantity;
    }

    reservation.totalQuantity = totalQuantity;
    await reservationRepo.save(reservation);

    await qr.commitTransaction();
    return reservation;
  } catch (err) {
    await qr.rollbackTransaction();
    throw err;
  } finally {
    await qr.release();
  }
}
