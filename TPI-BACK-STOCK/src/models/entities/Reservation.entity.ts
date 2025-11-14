import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { ReservationItem } from './';
import { EstadoReserva } from '../../types/reservation';
import { addDays } from 'date-fns';

@Entity('reservas') 
export class Reservation {
	@PrimaryGeneratedColumn()
	idReserva!: number;

	@Column({ name: 'id_compra', type: 'varchar', length: 50, unique: true })
	idCompra!: string; 

	@Column({ name: 'usuario_id', type: 'integer' }) 
	usuarioId!: number; 

	@Column({ name: 'estado', type: 'enum', enum: EstadoReserva, default: EstadoReserva.PENDIENTE }) 
	estado!: EstadoReserva; 

	@CreateDateColumn({ name: 'fecha_creacion' }) 
	fechaCreacion!: Date; 

	@UpdateDateColumn({ name: 'fecha_actualizacion' }) 
	fechaActualizacion!: Date;

	@Column({ name: 'expira_en', type: 'timestamp' }) 
	expiraEn!: Date; 

	@OneToMany(() => ReservationItem, (item: ReservationItem) => item.reserva, { cascade: true }) 
	items!: ReservationItem[];

	@BeforeInsert()
	setExpirationDate() {
		this.expiraEn = addDays(new Date(), 20); 
	}
}