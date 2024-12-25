import {
    Entity,
    Column,
    OneToMany
} from 'typeorm';
import { GeneralEntity } from './general.entity';
import { ManageUsers } from './manage-users.entity';

@Entity({ name: 'organization' })
export class Organization extends GeneralEntity {
    @Column()
    name: string;

    @Column()
    details: string;

    @Column({ type: 'smallint', default: 1 })
    status: number;

    @OneToMany(() => ManageUsers, (manageUser) => manageUser.organization_id)
    users: ManageUsers[];
}