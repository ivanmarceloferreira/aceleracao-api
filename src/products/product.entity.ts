import { Category } from "src/categories/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Category, {eager: true})
    @JoinColumn({name: 'category_id'})
    category: Category;

}