import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('usuarios') 
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 }) 
  nombre!: string; // Cambiado de 'name' a 'nombre'
  
  @Column({ name: 'email', type: 'varchar', unique: true })
  email!: string;
}