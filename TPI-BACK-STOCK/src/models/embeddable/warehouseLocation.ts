import { Column } from 'typeorm';

// This object will be embedded into the Product entity
export class WarehouseLocation {
  @Column({ name: 'warehouse_id' })
  warehouseId!: number;

  @Column({ length: 50 })
  aisle!: string; 

  @Column({ length: 50 })
  shelf!: string;

  @Column('int')
  level!: number;
}