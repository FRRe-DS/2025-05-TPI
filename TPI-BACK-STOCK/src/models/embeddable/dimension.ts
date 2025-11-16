import { Column } from 'typeorm';

export class Dimension {
    @Column({ name: 'largo_cm', type: "decimal", precision: 5, scale: 2, default: 0 })
    largoCm!: number;

    @Column({ name: 'ancho_cm', type: "decimal", precision: 5, scale: 2, default: 0 })
    anchoCm!: number;

    @Column({ name: 'alto_cm', type: "decimal", precision: 5, scale: 2, default: 0 })
    altoCm!: number;
}