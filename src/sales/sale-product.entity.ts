import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "./sale.entity";
import { Product } from "src/products/product.entity";

@Entity()
export class SaleProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Sale, (sale) => sale.products, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'sale_id'})
    sale: Sale;

    @ManyToOne(() => Product, { eager:true })
    @JoinColumn({name: 'product_id'})
    product: Product;

}