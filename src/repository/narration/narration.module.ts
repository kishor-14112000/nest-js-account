import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsEntity } from 'src/entities/accounts.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { NarrationContoller } from './narration.controller';
import { NarrationService } from './narration.service';
import { NarrationEntity } from 'src/entities/narration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        AccountsEntity,
        NarrationEntity
      ]),
      AuthModule
  ],
  controllers: [NarrationContoller],
  providers: [NarrationService],
})
export class NarrationModule {}