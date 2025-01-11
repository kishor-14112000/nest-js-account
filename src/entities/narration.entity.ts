import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GeneralEntity } from './general.entity';
import { Organization } from './organization.entity';
import { AccountsEntity } from './accounts.entity';

@Entity({ name: 'narration_data' })
export class NarrationEntity extends GeneralEntity {
    @Column({ nullable: false })
    name: string;
  
    @ManyToOne(() => AccountsEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account_id: AccountsEntity;

    @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organization_id' })
    organization_id: Organization;
}