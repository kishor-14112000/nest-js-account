import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AccountsDTO } from 'src/dto/accounts.dto';
import { AccountTypeEntity } from 'src/entities/account-type.entity';
import { SubAccountTypeEntity } from 'src/entities/sub-account-type.entity';
import { Repository } from 'typeorm';
const POST_ACCOUNTS = process.env.POST_ACCOUNTS;
const POST_ACCOUNT_TYPE = process.env.POST_ACCOUNT_TYPE;
const POST_SUB_ACCOUNT = process.env.POST_SUB_ACCOUNT;

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
    private readonly subAccountsEntity: Repository<SubAccountTypeEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async getDropdownData(): Promise<DropdownData | any> {
    try {
      const acc_type = await this.accountTypeEntity.find({
        select: ['id', 'name'],
        where: {
          status: 1,
        },
      });
      const sub_acc_type = await this.subAccountsEntity.find({
        select: ['id', 'sub_account_name'],
        where: {
          status: 1,
        },
      });
      return {
        acc_type,
        sub_acc_type,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async createAccount(payload: AccountsDTO): Promise<DropdownData | any> {
    let credit: string;
    let debit: string;
    try {
      if (payload.account_type === 'credit') {
        credit = payload.amount;
        debit = '0';
      } else {
        credit = '0';
        debit = payload.amount;
      }
      if (payload.id && payload.id.trim() !== '') {
        await this.accountTypeEntity
          .createQueryBuilder()
          .update(POST_ACCOUNTS)
          .set({
            organization: { id: payload.organization_id },
            subAccountType: { id: payload.sub_account_id },
            accountType: { id: payload.acc_type_id },
            name: payload.name,
            alias_name: payload.alias_name,
            debit: debit,
            credit: credit,
            created_by: payload.created_by,
          })
          .where('id = :id', { id: payload.id })
          .execute();
      } else {
        await this.accountTypeEntity
          .createQueryBuilder()
          .insert()
          .into(POST_ACCOUNTS)
          .values({
            organization: { id: payload.organization_id },
            subAccountType: { id: payload.sub_account_id },
            accountType: { id: payload.acc_type_id },
            name: payload.name,
            alias_name: payload.alias_name,
            debit: debit,
            credit: credit,
            created_by: payload.created_by,
          })
          .execute();
      }
      return { success: true, message: 'Operation completed successfully.' };
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Operation failed.');
    }
  }

  async getAccountData(): Promise<DropdownData | any> {
    try {
      const data = await this.dataSource.query(`
        select 
          ${POST_ACCOUNTS}.id,
          ${POST_ACCOUNTS}.name, 
          ${POST_ACCOUNTS}.alias_name, 
          ${POST_ACCOUNTS}.debit, 
          ${POST_ACCOUNTS}.credit,
          ${POST_ACCOUNT_TYPE}.name as account_type_name,
          ${POST_ACCOUNT_TYPE}.id as account_type_id,
          ${POST_SUB_ACCOUNT}.sub_account_name as sub_account_name,
          ${POST_SUB_ACCOUNT}.id as sub_account_id
        from ${POST_ACCOUNTS}
        left join ${POST_ACCOUNT_TYPE} ON ${POST_ACCOUNTS}.acc_type_id = ${POST_ACCOUNT_TYPE}.id
        left join ${POST_SUB_ACCOUNT} ON ${POST_ACCOUNTS}.sub_account_id = ${POST_SUB_ACCOUNT}.id
        where ${POST_ACCOUNTS}.deleted_at is null;
      `);
      return data;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Operation failed.');
    }
  }

  async deleteAccountData(payload: any) {
    const {id} = payload;
    try {
      const data = await this.dataSource.query(`
        update ${POST_ACCOUNTS} set deleted_at=now(), status=2 where id=$1;`,
        [id]
      );
      return { success: true, message: 'Operation completed successfully.' };
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Operation failed.');
    }
  }
}