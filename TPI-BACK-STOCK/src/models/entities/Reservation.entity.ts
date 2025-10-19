import { Entity, PrimaryGeneratedColumn, Column, OneToMany , CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ReservationItem } from './';

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'purchase_id', length: 50, unique: true })
    purchaseId!: string; // ID of the purchase in the Shopping Portal

    @Column({ name: 'user_id', type: 'int' })
    userId!: number; // ID of the buyer

    @Column({ length: 50 })
    state!: string; // 'PENDING', 'CANCELLED', 'RETRIEVED', etc.

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @Column('timestamp', { name: 'expires_at' })
    expiresAt!: Date; // For timeout logic


    // RELATION: One reservation has many items.
    @OneToMany(() => ReservationItem, (item: ReservationItem) => item.reservation, { cascade: true }) 
    items!: ReservationItem[];
}