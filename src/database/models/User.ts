import { hashSync } from "bcryptjs";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BeforeInsert } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column({})
    password!: string;

    @ManyToOne(type => Role, r => r.users)
    role!: Role;


    @CreateDateColumn()
    createdAt!: Date;


    @UpdateDateColumn()
    updatedAt!: Date;



    @BeforeInsert()
    prepare() {
        this.password = hashSync(this.password);
    }
}