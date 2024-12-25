import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountTypeEntity } from 'src/entities/account-type.entity';
import { SubAccountTypeEntity } from 'src/entities/sub-account-type.entity';
import { Repository } from 'typeorm';

interface DropdownData {
  accountTypes: AccountTypeEntity[];
  subAccountTypes: SubAccountTypeEntity[];
}

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountTypeEntity)
    private readonly accountTypeEntity: Repository<AccountTypeEntity>,

    @InjectRepository(SubAccountTypeEntity)
    private readonly subAccountsEntity: Repository<SubAccountTypeEntity>
  ) {}

  async getDropdownData(): Promise<DropdownData | any> {
    try {
      const acc_type = await this.accountTypeEntity.find();
      const sub_acc_type = await this.subAccountsEntity.find();
      return {
        acc_type,
        sub_acc_type
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}