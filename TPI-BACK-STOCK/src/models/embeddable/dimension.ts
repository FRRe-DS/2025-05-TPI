import { Column } from 'typeorm';


export class Dimension {
    @Column('float', { name: 'length_cm', precision: 5, scale: 2, default: 0 })
    lengthCm!: number;

    @Column('float', { name: 'width_cm', precision: 5, scale: 2, default: 0 })
    widthCm!: number;

    @Column('float', { name: 'height_cm', precision: 5, scale: 2, default: 0 })
    heightCm!: number;
}