import { Column } from 'typeorm';


export class Dimension {
    @Column({ name: 'length_cm', type:"decimal", precision: 5, scale: 2, default: 0 })
    lengthCm!: number;

    @Column({ name: 'width_cm', type:"decimal", precision: 5, scale: 2, default: 0 })
    widthCm!: number;

    @Column({ name: 'height_cm', type:"decimal", precision: 5, scale: 2, default: 0 })
    heightCm!: number;
}