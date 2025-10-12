// src/entities/Reservation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { ReservationItem } from "./ReservationItem.entity";

enum ReservationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id', type: 'int' })
    userId!: number;

    @Column({ 
        type: 'enum', 
        enum: ReservationStatus, 
        default: ReservationStatus.PENDING 
    })
    status!: ReservationStatus;

    @CreateDateColumn({ name: 'reservation_date' })
    reservationDate!: Date;

    @Column({ name: 'total_quantity', type: 'int' })
    totalQuantity!: number;

    @OneToMany(() => ReservationItem, (reservationItem:ReservationItem) => reservationItem.reservation)
    items!: ReservationItem[];
}