import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '.';

@Entity('producto_imagenes') 
export class ProductImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'url', type: 'varchar', length: 500 })
    url!: string;

    @Column({ name: 'es_principal', type: 'boolean', default: false })
    esPrincipal!: boolean; 
    
    @Column({ name: 'producto_id', type: 'integer' }) 
    productoId!: number; 

    @ManyToOne(() => Product, (product: Product) => product.imagenes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'producto_id' }) 
    producto!: Product; 
}