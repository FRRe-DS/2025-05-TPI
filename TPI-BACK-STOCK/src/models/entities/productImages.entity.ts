import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '.';

@Entity('product_images')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 500 })
    url!: string;

    @Column('boolean', { name: 'is_main', default: false })
    isMain!: boolean;

    // RELATION ManyToOne to Product.
    @ManyToOne(() => Product, (product: Product) => product.images, { onDelete: 'CASCADE' })
    product!: Product;

    @Column({ name: 'product_id' })
    productId!: number; 
}