import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Reservation } from "./Reservation.entity";
import { Product } from "./Product.entity";

@Entity("reservation_items")
export class ReservationItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Reservation, (reservation: Reservation) => reservation.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "reservation_id" })
  reservation!: Reservation;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "int" })
  cantidad!: number;

  @Column({ name: "precio_unitario", type: "decimal", precision: 10, scale: 2 })
  precioUnitario!: number;
}