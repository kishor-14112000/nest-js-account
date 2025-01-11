import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { GeneralEntity } from './general.entity';
import { Organization } from './organization.entity';
import { AccountsEntity } from './accounts.entity';

@Entity({ name: 'manage_users' })
export class ManageUsers extends GeneralEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  role: string;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @ManyToOne(() => Organization, (organization) => organization.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization_id: Organization;

  @ManyToOne(() => AccountsEntity, (accounts) => accounts.created_by, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'creater_id' })
  user_id: AccountsEntity;
}