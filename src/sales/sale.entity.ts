import { Client } from "src/clients/client.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client)
    @JoinColumn({name: 'client_id'})
    client: Client;

}