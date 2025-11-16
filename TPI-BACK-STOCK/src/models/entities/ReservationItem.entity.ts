import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reservation, Product } from './';

@Entity('reserva_items')
export class ReservationItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'producto_id' })
    productoId!: number; // Cambiado de 'productId' a 'productoId'
    
    @Column({ name: 'nombre', type: 'varchar' })
    nombre!: string; // Cambiado de 'name' a 'nombre'

    @Column({ name: 'cantidad' }) 
    cantidad!: number; // Cambiado de 'quantity' a 'cantidad'

    @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 }) 
    precioUnitario!: number; // Cambiado de 'unitPriceAtReservation' a 'precioUnitario'

    @ManyToOne(() => Reservation, reserva => reserva.items) // Cambiado 'reservation' a 'reserva'
    @JoinColumn({ name: 'reserva_id' }) 
    reserva!: Reservation; // Cambiado de 'reservation' a 'reserva'

    @ManyToOne(() => Product, producto => producto.itemsReserva) // Cambiado 'product' a 'producto', 'reservationItems' a 'itemsReserva'
    @JoinColumn({ name: 'producto_id' }) 
    producto!: Product; // Cambiado de 'product' a 'producto'
}