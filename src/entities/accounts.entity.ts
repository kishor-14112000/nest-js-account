import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { GeneralEntity } from "./general.entity";
import { Organization } from "./organization.entity";
import { AccountTypeEntity } from "./account-type.entity";
import { SubAccountTypeEntity } from "./sub-account-type.entity";
import { ManageUsers } from "./manage-users.entity";

@Entity({ name: 'accounts' })
export class AccountsEntity extends GeneralEntity {
    @Column({ nullable: false })
    name: string;
  
    @Column({ nullable: false })
    alias_name: string;
  
    @Column({ nullable: false })
    debit: string;

    @Column({ nullable: false })
    credit: string;

    @Column({ nullable: false })
    status: number;

    @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organization_id' })
    organization: Organization;

    @ManyToOne(() => AccountTypeEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'acc_type_id' })
    accountType: AccountTypeEntity;

    @ManyToOne(() => SubAccountTypeEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'sub_account_id' })
    subAccountType: SubAccountTypeEntity;

    @ManyToOne(() => ManageUsers, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by' })
    created_by: ManageUsers;
}