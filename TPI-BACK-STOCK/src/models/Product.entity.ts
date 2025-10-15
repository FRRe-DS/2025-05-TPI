import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @Column({ name: 'available_stock', type: 'int', default: 0 })
    availableStock!: number;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToMany('Category', (category: import("./Category.entity.js").Category) => category.products)
    @JoinTable({
        name: 'product_category',
        joinColumn: { 
            name: 'product_id', 
            referencedColumnName: 'id' 
        },
        inverseJoinColumn: { 
            name: 'category_id', 
            referencedColumnName: 'id' 
        }
    })
    categories!: import("./Category.entity.js").Category[];

    @OneToMany('ReservationItem', (reservationItem: import("./ReservationItem.entity.js").ReservationItem) => reservationItem.product)
    reservationItems!: import("./ReservationItem.entity.js").ReservationItem[];
}