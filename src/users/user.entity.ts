import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
}