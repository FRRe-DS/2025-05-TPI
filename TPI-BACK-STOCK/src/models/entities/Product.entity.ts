import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './Category.entity';
import { ProductImage } from './productImages.entity';
import { ReservationItem } from './ReservationItem.entity';
import { Dimension, WarehouseLocation } from '../embeddable';

@Entity('productos') 
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 200 }) 
  nombre!: string; // Cambiado de 'name' a 'nombre'

  @Column({ name: 'descripcion', type: 'varchar' }) 
  descripcion!: string; // Cambiado de 'description' a 'descripcion'

  @Column({ name: 'precio', type: 'decimal', precision: 10, scale: 2 })
  precio!: number; // Cambiado de 'unitPrice' a 'precio'

  @Column({ name: 'stock_disponible', type: 'integer' })
  stockDisponible!: number; // Cambiado de 'availableStock' a 'stockDisponible'

  @Column({ name: 'peso_kg', type: 'decimal', precision: 6, scale: 2 }) 
  pesoKg!: number; // Cambiado de 'weightKg' a 'pesoKg'

  @Column(() => Dimension)
  dimensiones!: Dimension; // Cambiado de 'dimensions' a 'dimensiones'

  @Column(() => WarehouseLocation)
  ubicacion!: WarehouseLocation; // Cambiado de 'location' a 'ubicacion'

  @ManyToMany(() => Category, (category: Category) => category.productos) // Cambiado 'products' a 'productos'
  @JoinTable({
    name: 'producto_categorias', 
    joinColumn: { name: 'producto_id', referencedColumnName: 'id' }, 
    inverseJoinColumn: { name: 'categoria_id', referencedColumnName: 'id' } 
  })
  categorias!: Category[]; // Cambiado de 'categories' a 'categorias'

  @OneToMany(() => ProductImage, (image: ProductImage) => image.producto, { cascade: true }) // Cambiado 'product' a 'producto'
  imagenes!: ProductImage[]; // Cambiado de 'images' a 'imagenes'

  @OneToMany(() => ReservationItem, (item: ReservationItem) => item.producto) // Cambiado 'product' a 'producto'
  itemsReserva!: ReservationItem[]; // Cambiado de 'reservationItems' a 'itemsReserva'
}