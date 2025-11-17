// src/entities/Category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Product } from "./Product.entity";

@Entity('categorias') 
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100, unique: true }) 
  nombre!: string; // Cambiado de 'name' a 'nombre'

  @Column({ name: 'descripcion', type: 'varchar', length: 100, default: 'Sin descripción' }) 
  descripcion!: string; // Cambiado de 'description' a 'descripcion'
    
  @ManyToMany(() => Product, product => product.categorias) // Cambiado 'categories' a 'categorias'
  productos!: Product[]; // Cambiado de 'products' a 'productos'
}