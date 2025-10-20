import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
<<<<<<< HEAD
import { Product } from '.';
=======
import { Product } from './Product.entity';
>>>>>>> 460d5b58158ed05419bfff66e97e2f23ee495e02

@Entity('product_images')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'url', type: 'varchar', length: 500 })
    url!: string;

<<<<<<< HEAD
    @Column({ name: 'is_main',  type: 'boolean', default: false })
    isMain!: boolean;
    
    @Column({ name: 'product_id', type:'integer' })
    productId!: number; 
=======
    @Column({ length: 255, nullable: true })
    alt?: string;

    @Column({ name: 'is_primary', default: false })
    isPrimary!: boolean;
>>>>>>> 460d5b58158ed05419bfff66e97e2f23ee495e02

    @ManyToOne(() => Product, (product: Product) => product.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}