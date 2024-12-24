import { Entity, Column } from "typeorm";
import { GeneralEntity } from "./general.entity";

@Entity({ name: 'account_type' })
export class AccountTypeEntity extends GeneralEntity {
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    status: number;
}