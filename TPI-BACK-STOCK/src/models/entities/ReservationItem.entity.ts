import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Reservation, Product } from './';

@Entity('reservation_items')
export class ReservationItem {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column('int')
    quantity!: number;

    @Column('decimal', { name: 'unit_price_at_reservation', precision: 10, scale: 2 })
    unitPriceAtReservation!: number; // Price "frozen" at the time of reservation

    // RELATIONS

    // ManyToOne to Reservation
    @ManyToOne(() => Reservation, reservation => reservation.items)
    reservation!: Reservation;

    @Column({ name: 'reservation_id' })
    reservationId!: number;

    // ManyToOne to Product
    @ManyToOne(() => Product, product => product.reservationItems)
    product!: Product;

    @Column({ name: 'product_id' })
    productId!: number;
}