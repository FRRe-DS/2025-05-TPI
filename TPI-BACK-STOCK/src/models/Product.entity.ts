import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./Category.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  nombre!: string;

  @Column({ type: "text", nullable: true })
  descripcion?: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio!: number;

  @Column({ type: "int", default: 0 })
  stockInicial!: number;

  @Column({ type: "int", default: 0 })
  stockDisponible!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  unidadMedida?: string;

  @ManyToMany(() => Category)
  @JoinTable({
    name: "product_categories",
    joinColumn: { name: "productId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "categoryId", referencedColumnName: "id" },
  })
  categorias!: Category[];

  @CreateDateColumn()
  fechaCreacion!: Date;

  @UpdateDateColumn()
  fechaActualizacion!: Date;
}