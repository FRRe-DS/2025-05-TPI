import { Column } from 'typeorm';

export class WarehouseLocation {
  @Column({ name: 'calle', type: 'varchar' })
  calle!: string;

  @Column({ name: 'ciudad', type: 'varchar' })
  ciudad!: string;

  @Column({ name: 'provincia', type: 'varchar' })
  provincia!: string;

  @Column({ name: 'codigo_postal', type: 'varchar' })
  codigoPostal!: string;

  @Column({ name: 'pais', type: 'varchar', length: 2 })
  pais!: string;
}