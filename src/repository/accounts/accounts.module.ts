import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountService } from './accounts.service';
import { AccountTypeEntity } from 'src/entities/account-type.entity';
import { SubAccountTypeEntity } from 'src/entities/sub-account-type.entity';
import { AccountsEntity } from 'src/entities/accounts.entity';
import { AuthModule } from 'src/authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        AccountTypeEntity,
        SubAccountTypeEntity,
        AccountsEntity
      ]),
      AuthModule
  ],
  controllers: [AccountsController],
  providers: [AccountService],
})
export class AccountsModule {}
