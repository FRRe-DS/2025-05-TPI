import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ProductImage } from './';
import { ReservationItem } from './';
import { Category } from './';
import { Dimension } from '../embeddable';
import { WarehouseLocation } from '../embeddable';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  name!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { name: 'unit_price', precision: 10, scale: 2 })
  unitPrice!: number; 

  @Column('int', { name: 'available_stock' })
  availableStock!: number;

  @Column('decimal', { name: 'weight_kg', precision: 6, scale: 2 })
  weightKg!: number;

  @Column(() => Dimension)
  dimensions!: Dimension;

  @Column(() => WarehouseLocation)
  location!: WarehouseLocation; 


  // ManyToMany with Category. Creates the join table 'product_category'.
  @ManyToMany(() => Category, (category: Category) => category.products)
  @JoinTable({
      name: "product_category", 
      joinColumn: { name: "product_id", referencedColumnName: "id" },
      inverseJoinColumn: { name: "category_id", referencedColumnName: "id" }
  })
  categories!: Category[];

  // OneToMany with Product Images
  @OneToMany(() => ProductImage, (image: ProductImage) => image.product, { cascade: ['insert', 'update'] })
  images!: ProductImage[];

  // OneToMany with Reservation Items
  @OneToMany(() => ReservationItem, (item: ReservationItem) => item.product)
  reservationItems!: ReservationItem[];
}