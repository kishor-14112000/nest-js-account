import { Entity, Column } from 'typeorm';
import { GeneralEntity } from './general.entity';

@Entity({ name: 'maintain_document_types' })
export class MaintainDocType extends GeneralEntity {
  @Column({ nullable: false })
  types: string;
}