import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintainDocType } from 'src/entities/maintain-doc-type.entity';
import { MaintainDocument } from 'src/entities/maintain-doc.entity';
import { ReceiptInformation } from 'src/entities/receipt.entity';
import { DataSource, Repository } from 'typeorm';

interface CombineEntityDoc {
  maintainDocType: MaintainDocType[];
  maintainDocument: MaintainDocument[];
  receiptInformation: ReceiptInformation[];
}

@Injectable()
export class MaintainDocService {
  constructor(
    @InjectRepository(MaintainDocType)
    private readonly maintainDocType: Repository<MaintainDocType>,

    @InjectRepository(MaintainDocument)
    private readonly maintainDocument: Repository<MaintainDocument>,

    @InjectRepository(ReceiptInformation)
    private readonly receiptInformation: Repository<ReceiptInformation>,

    private dataSource: DataSource,
  ) {}

  async getDocumentTypes(): Promise<CombineEntityDoc | any> {
    try {
      const doc_type = await this.maintainDocType.find({
        select: ['id', 'types'],
        where: {
          deleted_at: null,
        },
      });
      return doc_type;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
