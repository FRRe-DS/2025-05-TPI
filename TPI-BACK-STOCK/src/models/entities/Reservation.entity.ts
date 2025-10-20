import { Entity, PrimaryGeneratedColumn, Column, OneToMany , CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

<<<<<<< HEAD
    @Column({ name: 'user_id', type: 'integer'})
=======
    @Column({ name: 'user_id', type: 'int' })
>>>>>>> 460d5b58158ed05419bfff66e97e2f23ee495e02
    userId!: number; // ID of the buyer

    @Column({ name: 'state', type: 'enum', enum: ReservationState, default: ReservationState.PENDING})
    state!: ReservationState; 

<<<<<<< HEAD
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date;

    @Column({ name: 'expires_at', type: 'timestamp' })
=======
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @Column('timestamp', { name: 'expires_at' })
>>>>>>> 460d5b58158ed05419bfff66e97e2f23ee495e02
    expiresAt!: Date; // For timeout logic


    // RELATION: One reservation has many items.
    @OneToMany(() => ReservationItem, (item: ReservationItem) => item.reservation, { cascade: true }) 
    items!: ReservationItem[];
}