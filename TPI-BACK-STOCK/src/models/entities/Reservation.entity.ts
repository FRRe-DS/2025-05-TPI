import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReservationItem } from './';

export enum ReservationState {
    CONFIRMED = 'CONFIRMED',
    PENDING = 'PENDING',
    CANCELED = 'CANCELED'
}

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'purchase_id', type: 'varchar', length: 50, unique: true })
    purchaseId!: string; // ID of the purchase in the Shopping Portal

    @Column({ name: 'user_id', type: 'integer'})
    userId!: number; // ID of the buyer

    @Column({ name: 'state', type: 'enum', enum: ReservationState, default: ReservationState.PENDING})
    state!: ReservationState; 

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date;

    @Column({ name: 'expires_at', type: 'timestamp' })
    expiresAt!: Date; // For timeout logic

    // RELATION: One reservation has many items.
    @OneToMany(() => ReservationItem, (item: ReservationItem) => item.reservation, { cascade: true }) 
    items!: ReservationItem[];
}