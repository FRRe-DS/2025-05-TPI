import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Category } from './Category.entity';
import { ProductImage } from './productImages.entity';
import { ReservationItem } from './ReservationItem.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 , type: 'varchar' })
    name!: string;

    @Column('text', { nullable: true })
    description?: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column({ name: 'initial_stock', type: 'int', default: 0 })
    initialStock!: number;

    @Column({ name: 'available_stock', type: 'int', default: 0 })
    availableStock!: number;

    @Column({ name: 'unit_of_measurement', length: 100, nullable: true })
    unitOfMeasurement?: string;

    @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column('timestamp', { name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    // RELATION: Many to many with categories
    @ManyToMany(() => Category, (category: Category) => category.products)
    @JoinTable({
        name: 'product_categories',
        joinColumn: { name: 'productId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' }
    })
    categories!: Category[];

    // RELATION: One product has many images
    @OneToMany(() => ProductImage, (image: ProductImage) => image.product, { cascade: true })
    images!: ProductImage[];

    @OneToMany(() => ReservationItem, (item: ReservationItem) => item.product)
    reservationItems!: ReservationItem[];
}
