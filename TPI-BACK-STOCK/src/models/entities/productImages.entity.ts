import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '.';

@Entity('producto_imagenes') 
export class ProductImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'url', type: 'varchar', length: 500 })
    url!: string;

    @Column({ name: 'es_principal', type: 'boolean', default: false })
    esPrincipal!: boolean; // Cambiado de 'isMain' a 'esPrincipal'
    
    @Column({ name: 'producto_id', type: 'integer' }) 
    productoId!: number; // Cambiado de 'productId' a 'productoId'

    @ManyToOne(() => Product, (product: Product) => product.imagenes, { onDelete: 'CASCADE' }) // Cambiado 'images' a 'imagenes'
    @JoinColumn({ name: 'producto_id' }) 
    producto!: Product; // Cambiado de 'product' a 'producto'
}