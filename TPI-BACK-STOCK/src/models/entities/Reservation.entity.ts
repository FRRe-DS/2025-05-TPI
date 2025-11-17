import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { ReservationItem } from './';
import { EstadoReserva } from '../../types/reservation'; // Cambiado ReservationState a EstadoReserva
import { addDays } from 'date-fns';

@Entity('reservas') 
export class Reservation {
	@PrimaryGeneratedColumn()
	idReserva!: number; // Cambiado de 'id' a 'idReserva' para coincidir con el contrato

	@Column({ name: 'id_compra', type: 'varchar', length: 50, unique: true })
	idCompra!: string; // Cambiado de 'purchaseId' a 'idCompra'

	@Column({ name: 'usuario_id', type: 'integer' }) 
	usuarioId!: number; // Cambiado de 'userId' a 'usuarioId'

	@Column({ name: 'estado', type: 'enum', enum: EstadoReserva, default: EstadoReserva.PENDIENTE }) // Cambiado ReservationState a EstadoReserva
	estado!: EstadoReserva; // Cambiado de 'state' a 'estado'

	@CreateDateColumn({ name: 'fecha_creacion' }) 
	fechaCreacion!: Date; // Cambiado de 'createdAt' a 'fechaCreacion'

	@UpdateDateColumn({ name: 'fecha_actualizacion' }) 
	fechaActualizacion!: Date; // Cambiado de 'updatedAt' a 'fechaActualizacion'

	@Column({ name: 'expira_en', type: 'timestamp' }) 
	expiraEn!: Date; // Cambiado de 'expiresAt' a 'expiraEn'

	@OneToMany(() => ReservationItem, (item: ReservationItem) => item.reserva, { cascade: true }) // Cambiado 'reservation' a 'reserva'
	items!: ReservationItem[];

	@BeforeInsert()
	setExpirationDate() {
		this.expiraEn = addDays(new Date(), 20); // Cambiado 'expiresAt' a 'expiraEn'
	}
}