import { Client } from "src/clients/client.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleProduct } from "./sale-product.entity";

@Entity()
export class Sale {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, { eager: true })
    @JoinColumn({name: 'client_id'})
    client: Client;

    // mapeamento bidirecional
    @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.sale, {
        cascade: true,
        eager: true // fetch type
    })
    products: SaleProduct[];

}