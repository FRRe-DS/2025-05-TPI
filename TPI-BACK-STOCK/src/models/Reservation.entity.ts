import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ReservationItem } from "./ReservationItem.entity";

@Entity("reservations")
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "id_compra", type: "varchar", length: 255 })
  idCompra!: string;

  @Column({ name: "usuario_id", type: "int" })
  usuarioId!: number;

  @Column({
    type: "varchar",
    length: 50,
    default: "confirmado",
  })
  estado!: string; // confirmado, pendiente, cancelado

  @Column({ name: "expires_at", type: "timestamp" })
  expiresAt!: Date;

  @CreateDateColumn({ name: "fecha_creacion" })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: "fecha_actualizacion" })
  fechaActualizacion!: Date;

  @OneToMany(() => ReservationItem, (item: ReservationItem) => item.reservation, {
    cascade: true,
  })
  items!: ReservationItem[];
}