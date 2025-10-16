// src/entities/Category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Product } from "./Product.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    name!: string;

    @ManyToMany(() => Product, (product:Product) => product.categories)
    products!: Product[];
}