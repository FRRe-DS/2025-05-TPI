import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '.';

@Entity('product_images')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'url', type: 'varchar', length: 500 })
    url!: string;

    @Column({ name: 'is_main',  type: 'boolean', default: false })
    isMain!: boolean;
    
    @Column({ name: 'product_id', type:'integer' })
    productId!: number; 

    // RELATION ManyToOne to Product.
    @ManyToOne(() => Product, (product: Product) => product.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}