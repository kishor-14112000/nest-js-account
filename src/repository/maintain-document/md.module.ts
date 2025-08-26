import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth.module';
import { MaintainDocService } from './md.service';
import { DocContoller } from './md.controller';
import { MaintainDocType } from 'src/entities/maintain-doc-type.entity';
import { ReceiptInformation } from 'src/entities/receipt.entity';
import { MaintainDocument } from 'src/entities/maintain-doc.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        MaintainDocType,
        ReceiptInformation,
        MaintainDocument
      ]),
      AuthModule
  ],
  controllers: [DocContoller],
  providers: [MaintainDocService],
})
export class DocumentModule {}