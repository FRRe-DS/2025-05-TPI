import { AppDataSource} from "../config/appDataSource";
import { Reservation } from "../models/entities";
import { ReservationItem } from "../models/entities";
import { Product } from "../models/entities";
import { ReservaInput, GetReservationsFilters } from "../types/reservation";

const reservationRepository = AppDataSource.getRepository(Reservation);
const reservationItemRepository = AppDataSource.getRepository(ReservationItem);
const productRepository = AppDataSource.getRepository(Product);

export const createReservation = async (data: ReservaInput) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Crear la reserva
    const reservation = new Reservation();
    reservation.purchaseId = data.idCompra;
    reservation.userId = data.usuarioId;
    reservation.state = "confirmado";
    reservation.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    const savedReservation = await queryRunner.manager.save(reservation);

    // Procesar cada producto
    for (const item of data.productos) {
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: item.idProducto },
        lock: { mode: "pessimistic_write" },
      });

      if (!product) {
        throw new Error(`Producto no encontrado: ${item.idProducto}`);
      }

      if (product.availableStock < item.cantidad) {
        throw new Error(
          `Stock insuficiente para el producto ${product.name}. Disponible: ${product.availableStock}, Solicitado: ${item.cantidad}`
        );
      }

      // Reducir stock
      product.availableStock -= item.cantidad;
      await queryRunner.manager.save(product);

      // Crear item de reserva
      const reservationItem = new ReservationItem();
      reservationItem.reservation = savedReservation;
      reservationItem.product = product;
      reservationItem.quantity = item.cantidad;
      reservationItem.unitPriceAtReservation = product.price;

      await queryRunner.manager.save(reservationItem);
    }

    await queryRunner.commitTransaction();

    return {
      idReserva: savedReservation.id,
      idCompra: savedReservation.purchaseId,
      usuarioId: savedReservation.userId,
      estado: savedReservation.state,
      expiresAt: savedReservation.expiresAt,
      fechaCreacion: savedReservation.createdAt,
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

export const getReservationById = async (idReserva: number, usuarioId: number) => {
  const reservation = await reservationRepository.findOne({
    where: { id: idReserva, userId: usuarioId },
    relations: ["items", "items.product"],
  });

  if (!reservation) {
    return null;
  }

  return {
    idReserva: reservation.id,
    idCompra: reservation.purchaseId,
    usuarioId: reservation.userId,
    estado: reservation.state,
    expiresAt: reservation.expiresAt,
    fechaCreacion: reservation.createdAt,
    fechaActualizacion: reservation.updatedAt,
    productos: reservation.items.map((item: ReservationItem) => ({
      idProducto: item.product.id,
      nombre: item.product.name,
      cantidad: item.quantity,
      precioUnitario: item.unitPriceAtReservation,
    })),
  };
};

export const getUserReservations = async (filters: GetReservationsFilters) => {
  const { usuarioId, estado, page = 1, limit = 10 } = filters;

  const query = reservationRepository
    .createQueryBuilder("reservation")
    .leftJoinAndSelect("reservation.items", "items")
    .leftJoinAndSelect("items.product", "product")
    .where("reservation.userId = :usuarioId", { usuarioId });

  if (estado) {
    query.andWhere("reservation.state = :estado", { estado });
  }

  const reservations = await query
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy("reservation.createdAt", "DESC")
    .getMany();

  return reservations.map((reservation: Reservation) => ({
    idReserva: reservation.id,
    idCompra: reservation.purchaseId,
    usuarioId: reservation.userId,
    estado: reservation.state,
    expiresAt: reservation.expiresAt,
    fechaCreacion: reservation.createdAt,
    fechaActualizacion: reservation.updatedAt,
    productos: reservation.items.map((item: ReservationItem) => ({
      idProducto: item.product.id,
      nombre: item.product.name,
      cantidad: item.quantity,
      precioUnitario: item.unitPriceAtReservation,
    })),
  }));
};

export const updateReservationStatus = async (
  idReserva: number,
  usuarioId: number,
  estado: string
) => {
  const reservation = await reservationRepository.findOne({
    where: { id: idReserva, userId: usuarioId },
    relations: ["items", "items.product"],
  });

  if (!reservation) {
    return null;
  }

  reservation.state = estado;
  await reservationRepository.save(reservation);

  return {
    idReserva: reservation.id,
    idCompra: reservation.purchaseId,
    usuarioId: reservation.userId,
    estado: reservation.state,
    expiresAt: reservation.expiresAt,
    fechaCreacion: reservation.createdAt,
    fechaActualizacion: reservation.updatedAt,
    productos: reservation.items.map((item: ReservationItem) => ({
      idProducto: item.product.id,
      nombre: item.product.name,
      cantidad: item.quantity,
      precioUnitario: item.unitPriceAtReservation,
    })),
  };
};

export const cancelReservation = async (idReserva: number, motivo: string) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const reservation = await queryRunner.manager
      .createQueryBuilder(Reservation, "reservation")
      .innerJoinAndSelect("reservation.items", "items")
      .innerJoinAndSelect("items.product", "product")
      .where("reservation.id = :idReserva", { idReserva })
      .setLock("pessimistic_write")
      .getOne();

    if (!reservation) {
      await queryRunner.rollbackTransaction();
      return null;
    }

    // Liberar stock de cada producto
    for (const item of reservation.items) {
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: item.product.id },
        lock: { mode: "pessimistic_write" },
      });

      if (product) {
        product.availableStock += item.quantity;
        await queryRunner.manager.save(product);
      }
    }

    // Actualizar estado de la reserva a cancelado
    reservation.state = "cancelado";
    await queryRunner.manager.save(reservation);

    await queryRunner.commitTransaction();
    return true;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};