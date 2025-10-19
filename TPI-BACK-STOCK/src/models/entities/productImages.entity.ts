import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './Product.entity';

@Entity('product_images')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 500 })
    url!: string;

    @Column({ length: 255, nullable: true })
    alt?: string;

    @Column({ name: 'is_primary', default: false })
    isPrimary!: boolean;

    @ManyToOne(() => Product, (product: Product) => product.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}