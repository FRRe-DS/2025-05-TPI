// src/repositories/ReservationRepository.ts

import { Repository, DataSource, EntityManager } from 'typeorm';
import { Reservation, ReservationItem, Product } from '../models/entities';
import { ReservaInput, EstadoReserva } from '../types/reservation'; // Cambiado imports
import { AppDataSource } from '../config/appDataSource';

export class ReservationRepository {
  private repository: Repository<Reservation>

  constructor() {
    this.repository = AppDataSource.getRepository(Reservation);
  }

  findAll() {
    return this.repository.find({
      relations: ["items", "items.producto"], // Cambiado product a producto si es necesario
      order: {
        fechaCreacion: "DESC" // Cambiado createdAt a fechaCreacion
      }
    });
  }

  findById(id: number) {
  return this.repository.findOne({
    where: { idReserva: id }, // ✅ Cambiado de 'id' a 'idReserva'
    relations: ["items", "items.producto"], // ✅ Cambiado de "items.product"
  })
  }

  findByUserId(usuarioId: number) {
    return this.repository.find({
      where: { 
        usuarioId: usuarioId // Cambiado userId a usuarioId
      },
      relations: ["items", "items.producto"], // Cambiado product a producto
      order: {
        fechaCreacion: "DESC" // Cambiado createdAt a fechaCreacion
      }
    });
  } 

  findByUserReservation(idReserva: number, usuarioId: number) {
  return this.repository.findOne({
    where: { 
      idReserva: idReserva, // ✅ Cambiado de 'id' a 'idReserva'
      usuarioId: usuarioId 
    },
    relations: ["items", "items.producto"],
  });
  }

  update(id: number, reservaData: Partial<Reservation>) {
    return this.repository.update(id, reservaData);
  }

  // Transactional methods 

  async cancelReservation(idReserva: number): Promise<boolean> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const reservation = await queryRunner.manager
        .createQueryBuilder(Reservation, "reservation")
        .innerJoinAndSelect("reservation.items", "items")
        .innerJoinAndSelect("items.producto", "product") // Cambiado product a producto
        .where("reservation.id = :idReserva", { idReserva })
        .setLock("pessimistic_write") 
        .getOne();

      if (!reservation || reservation.estado === EstadoReserva.CANCELADO) { // Cambiado state a estado
        await queryRunner.rollbackTransaction();
        return false; 
      }

      for (const item of reservation.items) {
        await queryRunner.manager.increment(
          Product, 
          { id: item.producto.id }, 
          'stockDisponible',
          item.cantidad
        );
      }

      reservation.estado = EstadoReserva.CANCELADO; // Cambiado state a estado
      await queryRunner.manager.save(reservation);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error; 
    } finally {
      await queryRunner.release();
    }
  }

  async createReservation(data: ReservaInput): Promise<Reservation> { // Cambiado ReservationInput a ReservaInput
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const transactionalManager = queryRunner.manager;

      const newReservation = new Reservation();
      newReservation.idCompra = String(data.idCompra); // Cambiado purchaseId a idCompra
      newReservation.usuarioId = data.usuarioId; // Cambiado userId a usuarioId
      newReservation.estado = EstadoReserva.PENDIENTE; // Cambiado state a estado
      newReservation.items = []; 

      for (const productoInput of data.productos) { // Cambiado items a productos
        const product = await transactionalManager
          .createQueryBuilder(Product, "product")
          .where("product.id = :id", { id: productoInput.idProducto }) // Cambiado productId a idProducto
          .setLock("pessimistic_write") 
          .getOne();

        if (!product || product.stockDisponible < productoInput.cantidad) { // Cambiado availableStock a stockDisponible
          throw new Error(`PRODUCT_STOCK_ERROR: Stock insuficiente para producto ${productoInput.idProducto}`);
        }

        await transactionalManager.decrement(
          Product,
          { id: product.id },
          'stockDisponible', // Cambiado availableStock a stockDisponible
          productoInput.cantidad // Cambiado quantity a cantidad
        );

        const reservationItem = transactionalManager.create(ReservationItem, {
          producto: product, // Cambiado product a producto
          nombre: product.nombre, // Usar nombre del producto
          cantidad: productoInput.cantidad, // Cambiado quantity a cantidad
          precioUnitario: product.precio // Cambiado unitPrice a precio
        });
        
        newReservation.items.push(reservationItem);
      }
      
      const savedReservation = await transactionalManager.save(newReservation);
      await queryRunner.commitTransaction();
      return savedReservation;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error; 
    } finally {
      await queryRunner.release();
    }
  }
}