import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: string;

    @Column({ name: 'cpf_cnpj' })
    cpfCnpj: string;

    @Column()
    birthDate: Date;

}