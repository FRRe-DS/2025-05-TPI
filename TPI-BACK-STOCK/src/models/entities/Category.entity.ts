// src/entities/Category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Product } from "./Product.entity";

@Entity('categorias') 
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100, unique: true }) 
  nombre!: string; 

  @Column({ name: 'descripcion', type: 'varchar', length: 100, default: 'Sin descripción' }) 
  descripcion!: string; 
    
  @ManyToMany(() => Product, product => product.categorias) 
  productos!: Product[]; 
}