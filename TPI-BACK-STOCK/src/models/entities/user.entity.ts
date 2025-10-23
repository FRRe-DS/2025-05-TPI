import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity('user')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name' ,type: 'varchar', length: 100, unique: true })
  name!: string;
  
  @Column({ name: 'email' ,type: 'varchar',  unique: true })
  email!: string;
}