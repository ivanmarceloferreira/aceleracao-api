import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: string;

    @Column('decimal', { precision: 15, scale: 2 })
    price: number

    @Column()
    description: string;

}