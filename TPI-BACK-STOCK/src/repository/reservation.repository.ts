// src/repositories/ReservationRepository.ts

import { Repository, DataSource, EntityManager } from 'typeorm';
import { Reservation, ReservationItem, Product } from '../models/entities'; // Asume que estas rutas son correctas
import { ReservaInput, ReservationState } from '../types/reservation'; // Asume que esta ruta es correcta
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
}