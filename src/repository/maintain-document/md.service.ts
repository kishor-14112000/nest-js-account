import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceiptInfoDTO } from 'src/dto/receipt-info.dto';
import { MaintainDocType } from 'src/entities/maintain-doc-type.entity';
import { MaintainDocument } from 'src/entities/maintain-doc.entity';
import { ReceiptInformation } from 'src/entities/receipt.entity';
import { DataSource, Repository } from 'typeorm';
const POST_RECEIPT_INFORMATION = process.env.POST_RECEIPT_INFORMATION;
const POST_MAINTAIN_DOCUMENT = process.env.POST_MAINTAIN_DOCUMENT;

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

  async createReceiptInfo(payload: any): Promise<CombineEntityDoc | any> {
    const { accountTypes, date, docTypes, receiptNumber, rows, totalAmount, organization_id, total_lines } = payload;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const maintainQuery = `
            INSERT INTO ${POST_MAINTAIN_DOCUMENT} (
                type, header_account, date, receipt, total_amount, total_lines, organization_id
            ) VALUES (
                '${docTypes}', '${accountTypes.label}', '${date}', '${receiptNumber}', '${totalAmount}', '${total_lines}', '${organization_id}'
            )
        `;
      await queryRunner.query(maintainQuery);
      for (const row of rows) {
        const { narrationText, accountTypes, amount } = row;
        const receiptQuery = `
                INSERT INTO ${POST_RECEIPT_INFORMATION} (receipt_id, narration, account_id, amount)
                VALUES ('${receiptNumber}', '${narrationText}', '${accountTypes}', ${amount})
            `;
        await queryRunner.query(receiptQuery);
      }
      await queryRunner.commitTransaction();
      return { success: true, message: 'Data inserted successfully' };
    } catch (error) {
      console.log("🚀 ~ MaintainDocService ~ createReceiptInfo ~ error:", error)
      await queryRunner.rollbackTransaction();
      throw new Error(`Error while inserting data: ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async getMaintainDocument(): Promise<CombineEntityDoc | any> {
    try {
        const doc_type = await this.maintainDocument.find({
          select: ['id', 'type', 'header_account', 'date', 'receipt', 'total_amount', 'total_lines'],
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