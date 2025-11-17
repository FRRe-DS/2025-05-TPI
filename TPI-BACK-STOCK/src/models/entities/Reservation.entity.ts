import { Entity, PrimaryGeneratedColumn, Column, OneToMany , CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { ReservationItem } from './';
import { ReservationState } from '../../types/reservation';
import { addDays } from 'date-fns';

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

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt!: Date;

	@Column({ name: 'expires_at', type: 'timestamp' })
	expiresAt!: Date;

	// RELATION: One reservation has many items.
	@OneToMany(() => ReservationItem, (item: ReservationItem) => item.reservation, { cascade: true }) 
	items!: ReservationItem[];

	@BeforeInsert()
	setExpirationDate() {
		this.expiresAt = addDays(new Date(), 20);
	}
}