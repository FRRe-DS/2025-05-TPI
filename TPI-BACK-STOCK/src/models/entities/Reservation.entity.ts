import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReservationItem } from './';

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'purchase_id', length: 50, unique: true })
    purchaseId!: string; // ID of the purchase in the Shopping Portal

    @Column({ name: 'user_id', length: 50 })
    userId!: string; // ID of the buyer

    @Column({ length: 50 })
    state!: string; // 'PENDING', 'CANCELLED', 'RETRIEVED', etc.

    @Column('timestamp', { name: 'created_at' })
    createdAt!: Date;

    @Column('timestamp', { name: 'expires_at' })
    expiresAt!: Date; // For timeout logic

    // RELATION: One reservation has many items.
    @OneToMany(() => ReservationItem, (item: ReservationItem) => item.reservation, { cascade: true }) 
    items!: ReservationItem[];
}