import { Column } from 'typeorm';
export class WarehouseLocation {
  @Column({ name: 'warehouse_id', type:'integer' })
  warehouseId!: number; 

  @Column({ name: 'aisle', type:'varchar' })
  aisle!: string; 

  @Column({ name: 'shelf', type:'varchar' })
  shelf!: string;

  @Column({ name: 'level', type:'integer' })
  level!: number;
}