import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Reserva } from './Reserva.entity';
import { Producto } from './Producto.entity';

@Entity('reserva_productos')
export class ReservaProducto {
  @PrimaryColumn({ name: 'id_reserva' })
  idReserva!: number;

  @PrimaryColumn({ name: 'id_producto' })
  idProducto!: number;

  @Column()
  cantidad!: number;

  @Column({ type: 'float', name: 'precio_unitario' })
  precioUnitario!: number; // Precio al momento de la reserva

  @Column({ length: 255 })
  nombre!: string; // Nombre del producto al momento de la reserva

  // Relación ManyToOne con Reserva
  @ManyToOne(() => Reserva, (reserva: Reserva) => reserva.productos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_reserva' })
  reserva!: Reserva;

  // Relación ManyToOne con Producto
  @ManyToOne(() => Producto, (producto: Producto) => producto.itemsReservados)
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;
}