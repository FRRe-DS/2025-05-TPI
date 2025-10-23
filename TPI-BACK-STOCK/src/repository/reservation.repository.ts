// src/repositories/ReservationRepository.ts

import { Repository, DataSource, EntityManager } from 'typeorm';
import { Reservation, ReservationItem, Product } from '../models/entities'; // Asume que estas rutas son correctas
import { ReservationInput, ReservationState } from '../types/reservation'; // Asume que esta ruta es correcta
import { AppDataSource } from '../config/appDataSource';

export class ReservationRepository {

  private repository: Repository<Reservation>

  constructor() {
    this.repository = AppDataSource.getRepository(Reservation);
  }

  findAll() {
    return this.repository.find({
      relations: ["items", "items.product"],
      order: {
        createdAt: "DESC" 
      }
    });
  }

  findById(id: number){
    return this.repository.findOne({
      where: { id },
      relations: ["items", "items.product"],
    })
  }

  findByUserId(usuarioId: number) {
    return this.repository.find({
      where: { 
        userId: usuarioId 
      },
      relations: ["items", "items.product"],

      order: {
        createdAt: "DESC" 
      }
    });
  } 

  findByUserReservation(idReserva: number, usuarioId: number) {
    return this.repository.findOne({
      where: { 
        id: idReserva,
        userId: usuarioId 
      },
      relations: ["items", "items.product"],
    });
  }

  update(id:number, reservaData: Partial<Reservation>) {
    return this.repository.update(id, reservaData)
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

      if (!reservation || reservation.state === ReservationState.CANCELLED) {
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

      reservation.state = ReservationState.CANCELLED; 
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

  async createReservation(data: ReservationInput): Promise<Reservation> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const transactionalManager = queryRunner.manager;

      const newReservation = new Reservation();
      newReservation.purchaseId = String(data.purchaseId);
      newReservation.userId = data.userId;
      newReservation.state = ReservationState.PENDING;
      newReservation.items = []; 

      for (const itemInput of data.items) {
        
        const product = await transactionalManager
          .createQueryBuilder(Product, "product")
          .where("product.id = :id", { id: itemInput.productId })
          .setLock("pessimistic_write") 
          .getOne();
        

        if (!product || product.availableStock < itemInput.quantity) {
          throw new Error(`PRODUCT_STOCK_ERROR: Stock insuficiente para producto ${itemInput.productId}`);
        }

        await transactionalManager.decrement(
          Product,
          { id: product.id },
          'availableStock',
          itemInput.quantity
        );

        const reservationItem = transactionalManager.create(ReservationItem, {
          product: product, 
          name: itemInput.name, 
          quantity: itemInput.quantity,
          unitPriceAtReservation: itemInput.unitPriceAtReservation
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