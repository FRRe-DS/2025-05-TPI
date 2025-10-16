import { appDataSource } from "../config/appDataSource";
import { Reservation } from "../models/Reservation.entity";
import { ReservationItem } from "../models/ReservationItem.entity";
import { Product } from "../models/Product.entity";
import { ReservaInput, GetReservationsFilters } from "../types/reservation";

const reservationRepository = appDataSource.getRepository(Reservation);
const reservationItemRepository = appDataSource.getRepository(ReservationItem);
const productRepository = appDataSource.getRepository(Product);

export const createReservation = async (data: ReservaInput) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Crear la reserva
    const reservation = new Reservation();
    reservation.idCompra = data.idCompra;
    reservation.usuarioId = data.usuarioId;
    reservation.estado = "confirmado";
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

      if (product.stockDisponible < item.cantidad) {
        throw new Error(
          `Stock insuficiente para el producto ${product.nombre}. Disponible: ${product.stockDisponible}, Solicitado: ${item.cantidad}`
        );
      }

      // Reducir stock
      product.stockDisponible -= item.cantidad;
      await queryRunner.manager.save(product);

      // Crear item de reserva
      const reservationItem = new ReservationItem();
      reservationItem.reservation = savedReservation;
      reservationItem.product = product;
      reservationItem.cantidad = item.cantidad;
      reservationItem.precioUnitario = product.precio;

      await queryRunner.manager.save(reservationItem);
    }

    await queryRunner.commitTransaction();

    return {
      idReserva: savedReservation.id,
      idCompra: savedReservation.idCompra,
      usuarioId: savedReservation.usuarioId,
      estado: savedReservation.estado,
      expiresAt: savedReservation.expiresAt,
      fechaCreacion: savedReservation.fechaCreacion,
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
    where: { id: idReserva, usuarioId },
    relations: ["items", "items.product"],
  });

  if (!reservation) {
    return null;
  }

  return {
    idReserva: reservation.id,
    idCompra: reservation.idCompra,
    usuarioId: reservation.usuarioId,
    estado: reservation.estado,
    expiresAt: reservation.expiresAt,
    fechaCreacion: reservation.fechaCreacion,
    fechaActualizacion: reservation.fechaActualizacion,
    productos: reservation.items.map((item: ReservationItem) => ({
      idProducto: item.product.id,
      nombre: item.product.nombre,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
    })),
  };
};

export const getUserReservations = async (filters: GetReservationsFilters) => {
  const { usuarioId, estado, page = 1, limit = 10 } = filters;

  const query = reservationRepository
    .createQueryBuilder("reservation")
    .leftJoinAndSelect("reservation.items", "items")
    .leftJoinAndSelect("items.product", "product")
    .where("reservation.usuarioId = :usuarioId", { usuarioId });

  if (estado) {
    query.andWhere("reservation.estado = :estado", { estado });
  }

  const reservations = await query
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy("reservation.fechaCreacion", "DESC")
    .getMany();

  return reservations.map((reservation: Reservation) => ({
    idReserva: reservation.id,
    idCompra: reservation.idCompra,
    usuarioId: reservation.usuarioId,
    estado: reservation.estado,
    expiresAt: reservation.expiresAt,
    fechaCreacion: reservation.fechaCreacion,
    fechaActualizacion: reservation.fechaActualizacion,
    productos: reservation.items.map((item: ReservationItem) => ({
      idProducto: item.product.id,
      nombre: item.product.nombre,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
    })),
  }));
};

export const updateReservationStatus = async (
  idReserva: number,
  usuarioId: number,
  estado: string
) => {
  const reservation = await reservationRepository.findOne({
    where: { id: idReserva, usuarioId },
    relations: ["items", "items.product"],
  });

  if (!reservation) {
    return null;
  }

  reservation.estado = estado;
  reservation.fechaActualizacion = new Date();
  await reservationRepository.save(reservation);

  return {
    idReserva: reservation.id,
    idCompra: reservation.idCompra,
    usuarioId: reservation.usuarioId,
    estado: reservation.estado,
    expiresAt: reservation.expiresAt,
    fechaCreacion: reservation.fechaCreacion,
    fechaActualizacion: reservation.fechaActualizacion,
    productos: reservation.items.map((item: ReservationItem) => ({
      idProducto: item.product.id,
      nombre: item.product.nombre,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
    })),
  };
};

export const cancelReservation = async (idReserva: number, motivo: string) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Buscar la reserva con sus items usando INNER JOIN para evitar el error de LEFT JOIN con lock
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
        product.stockDisponible += item.cantidad;
        await queryRunner.manager.save(product);
      }
    }

    // Actualizar estado de la reserva a cancelado
    reservation.estado = "cancelado";
    reservation.fechaActualizacion = new Date();
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