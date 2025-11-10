// src/models/entities/Product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Category } from './Category.entity';
import { ProductImage } from './productImages.entity';
import { ReservationItem } from './ReservationItem.entity';
import { Dimension, WarehouseLocation } from '../embeddable';

@Entity('productos')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 200 })
  nombre!: string;

  @Column({ name: 'descripcion', type: 'varchar' })
  descripcion!: string;

  @Column({ name: 'precio', type: 'decimal', precision: 10, scale: 2 })
  precio!: number;

  @Column({ name: 'stock_disponible', type: 'integer' })
  stockDisponible!: number;

  @Column({ name: 'peso_kg', type: 'decimal', precision: 6, scale: 2 })
  pesoKg!: number;

  @Column(() => Dimension)
  dimensiones!: Dimension;

  @Column(() => WarehouseLocation)
  ubicacion!: WarehouseLocation;

  @ManyToMany(() => Category, (category: Category) => category.productos)
  @JoinTable({
    name: 'producto_categorias',
    joinColumn: { name: 'producto_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoria_id', referencedColumnName: 'id' }
  })
  categorias!: Category[];

  @OneToMany(() => ProductImage, (image: ProductImage) => image.producto, { cascade: true })
  imagenes!: ProductImage[];

  @OneToMany(() => ReservationItem, (item: ReservationItem) => item.producto)
  itemsReserva!: ReservationItem[];
}