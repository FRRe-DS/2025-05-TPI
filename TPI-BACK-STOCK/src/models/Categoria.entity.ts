import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Producto } from './Producto.entity'; 

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, unique: true })
  nombre!: string;

  @Column({ nullable: true, type: 'text' })
  descripcion!: string | null;

  @ManyToMany(() => Producto, (producto: Producto) => producto.categorias)
  @JoinTable({
    name: 'producto_categoria',
    joinColumn: { name: 'categoria_id' },
    inverseJoinColumn: { name: 'producto_id' },
  })
  productos!: Producto[];
}