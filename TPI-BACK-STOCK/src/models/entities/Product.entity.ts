import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './Category.entity';
import { ProductImage } from './productImages.entity';
import { ReservationItem } from './ReservationItem.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name',  type: 'varchar', length: 200 })
  name!: string;

  @Column({name:'description', type:'varchar'})
  description!: string;

  @Column({ name: 'unit_price', type:'decimal', precision: 10, scale: 2 })
  unitPrice!: number; 

  @Column({ name: 'available_stock', type:'integer' })
  availableStock!: number;

  @Column({ name: 'weight_kg', type:'decimal', precision: 6, scale: 2 })
  weightKg!: number;

  @Column({ name: 'unit_of_measurement', length: 100, nullable: true })
  unitOfMeasurement?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
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
