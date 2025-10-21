// src/repositories/ReservationRepository.ts

import { Repository } from 'typeorm';
import { Reservation, ReservationItem, Product } from '../models/entities';
import { ReservaInput, ReservationState } from '../types/reservation'; 
import { AppDataSource } from '../config/appDataSource';

export class ReservationRepository {

  private repository: Repository<Reservation>

  constructor() {
    this.repository = AppDataSource.getRepository(Reservation);
  }


  //Trasactional methods 

  async cancelReservation(idReserva: number): Promise<boolean> {
    
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

      if (!reservation || reservation.state === ReservationState.CANCELED) {
        await queryRunner.rollbackTransaction();
        return false; 
      }

      for (const item of reservation.items) {
        await queryRunner.manager.increment(
            Product, 
            { id: item.product.id },
            'availableStock',        
            item.quantity            
        );
      }

      reservation.state = ReservationState.CANCELED; 
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

  async createReservation(data: ReservaInput): Promise<Reservation> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const transactionalManager = queryRunner.manager;

      const newReservation = new Reservation();
      //newReservation.userId = data.userId;
      newReservation.userId = 123; // Temporal hasta auth
      newReservation.state = ReservationState.PENDING;
      newReservation.items = []; 

      for (const itemInput of data.productos) {
        
        const product = await transactionalManager
          .createQueryBuilder(Product, "product")
          .where("product.id = :id", { id: itemInput.idProducto })
          .setLock("pessimistic_write") 
          .getOne();

        if (!product || product.availableStock < itemInput.cantidad) {
          throw new Error(`PRODUCT_STOCK_ERROR: Stock insuficiente para producto ${itemInput.idProducto}`);
        }

        await transactionalManager.decrement(
          Product,
          { id: product.id },
          'availableStock',
          itemInput.cantidad
        );

        const reservationItem = transactionalManager.create(ReservationItem, {
          product: product,             
          quantity: itemInput.cantidad,
          unitPrice: product.unitPrice 
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