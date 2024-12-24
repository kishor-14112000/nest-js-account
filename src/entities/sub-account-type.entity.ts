import { Entity, Column } from "typeorm";
import { GeneralEntity } from "./general.entity";

@Entity({ name: 'sub_accounts' })
export class SubAccountTypeEntity extends GeneralEntity {
    @Column({ nullable: false })
    sub_account_name: string;

    @Column({ nullable: false })
    status: number;
}