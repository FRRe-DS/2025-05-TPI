import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';
import { Categoria } from './Categoria.entity';
import { ReservaProducto } from './ReservaProducto.entity';

interface Dimensiones {
  largoCm: number;
  anchoCm: number;
  altoCm: number;
}

interface UbicacionAlmacen {
  almacenId: number;
  pasillo: string;
  estanteria: string;
  nivel: number;
}

interface ImagenProducto {
  url: string;
  esPrincipal: boolean;
}

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index() // Se recomienda indexar el nombre para búsquedas
  @Column({ length: 200 })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string | null;

  @Column({ type: 'float', default: 0 })
  precio!: number;

  @Column({ type: 'int', default: 0 })
  stockDisponible!: number;

  @Column({ type: 'float', default: 0, name: 'peso_kg' })
  pesoKg!: number;

  // Campos de objetos (usando JSONB si es compatible con tu base de datos)
  @Column({ type: 'jsonb', nullable: true })
  dimensiones!: Dimensiones | null;

  @Column({ type: 'jsonb', nullable: true })
  ubicacion!: UbicacionAlmacen | null;

  @Column('jsonb', { array: false, default: () => "'[]'" }) // Array de objetos ImagenProducto
  imagenes!: ImagenProducto[];

  
  @ManyToMany(() => Categoria, (categoria:Categoria) => categoria.productos)
  @JoinTable({
    name: 'producto_categoria',
    joinColumn: { name: 'producto_id' },
    inverseJoinColumn: { name: 'categoria_id' },
  })
  categorias!: Categoria[];

  
  @OneToMany(() => ReservaProducto, (reservaProducto: ReservaProducto) => reservaProducto.producto)
  itemsReservados!: ReservaProducto[];
}