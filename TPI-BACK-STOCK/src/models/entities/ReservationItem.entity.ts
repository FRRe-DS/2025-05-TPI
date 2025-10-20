import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reservation, Product } from './';

@Entity('reservation_items')
export class ReservationItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'product_id' })
    productId!: number;
    
    @Column({name: 'name', type: 'varchar'})
    name!: string;

    @Column({name: 'quantity'})
    quantity!: number;

    @Column({ name: 'unit_price', type: 'decimal',  precision: 10, scale: 2 })
    unitPriceAtReservation!: number; // Price "frozen" at the time of reservation

    // RELATIONS

    // ManyToOne to Reservation
    @ManyToOne(() => Reservation, reservation => reservation.items)
    @JoinColumn({ name: 'reservation_id' })
    reservation!: Reservation;

    // ManyToOne to Product
    @ManyToOne(() => Product, product => product.reservationItems)
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}