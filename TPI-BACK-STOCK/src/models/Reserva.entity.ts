import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ReservaProducto } from './ReservaProducto.entity'; 
export type EstadoReserva = 'confirmado' | 'pendiente' | 'cancelado';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn({ name: 'id_reserva' })
  idReserva!: number;

  @Column({ length: 255, unique: true, name: 'id_compra' })
  idCompra!: string;

  @Column({ name: 'usuario_id' })
  usuarioId!: number;

  @Column({
    type: 'enum',
    enum: ['confirmado', 'pendiente', 'cancelado'],
    default: 'pendiente',
  })
  estado!: EstadoReserva;

  @Column({ type: 'timestamp with time zone', nullable: true, name: 'expires_at' })
  expiresAt!: Date | null;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion!: Date;

  // Relación OneToMany con el detalle de los productos reservados
  @OneToMany(() => ReservaProducto, (detalle: ReservaProducto) => detalle.reserva, { cascade: true })
  productos!: ReservaProducto[];
}