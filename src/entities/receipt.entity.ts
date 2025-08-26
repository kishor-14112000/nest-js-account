import { Entity, Column } from 'typeorm';
import { GeneralEntity } from './general.entity';

@Entity({ name: 'receipt_information' })
export class ReceiptInformation extends GeneralEntity {
    @Column({ nullable: false })
    receipt_id: string;

    @Column({ nullable: false })
    narration: string;

    @Column({ nullable: false })
    account_id: string;
}
