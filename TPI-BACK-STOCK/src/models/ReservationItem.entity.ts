// src/models/ReservationItem.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('reservation_items')
export class ReservationItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'reservation_id', type: 'int' })
    reservationId!: number;

    @Column({ name: 'product_id', type: 'int' })
    productId!: number;

    @Column({ name: 'reserved_quantity', type: 'int' })
    reservedQuantity!: number;

    @ManyToOne('Reservation', (reservation: import("./Reservation.entity.js").Reservation) => reservation.items)
    @JoinColumn({ name: 'reservation_id' })
    reservation!: import("./Reservation.entity.js").Reservation;

    @ManyToOne('Product', (product: import("./Product.entity.js").Product) => product.reservationItems)
    @JoinColumn({ name: 'product_id' })
    product!: import("./Product.entity.js").Product;
}