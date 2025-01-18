import { Entity, Column } from 'typeorm';
import { GeneralEntity } from './general.entity';

@Entity({ name: 'maintain_document' })
export class MaintainDocument extends GeneralEntity {
  @Column({ nullable: false })
  types: string;

  @Column({ nullable: false })
  header_account: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  receipt: string;

  @Column({ nullable: false })
  total_amount: string;

  @Column({ nullable: false })
  total_lines: number;
}
