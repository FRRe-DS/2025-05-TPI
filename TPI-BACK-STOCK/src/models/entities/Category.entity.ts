// src/entities/Category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Product } from "./Product.entity";

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name' ,type: 'varchar', length: 100, unique: true })
  name!: string;

  @Column({ name: 'description', type: 'varchar', length: 100, default: 'Sin descripción' })
  description!: string; 
    
  // RELATION Many-to-Many: maps the inverse relationship in the Product entity.
  @ManyToMany(() => Product, product => product.categories)
  products!: Product[];
}