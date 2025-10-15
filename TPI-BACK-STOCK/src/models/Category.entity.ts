import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
// Quitamos la importación directa de Product para romper el ciclo

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    name!: string;

    // CORRECCIÓN AQUÍ: Usamos el string 'Product' y el import() dinámico
    @ManyToMany('Product', (product: import("./Product.entity.js").Product) => product.categories)
    products!: import("./Product.entity.js").Product[];
}