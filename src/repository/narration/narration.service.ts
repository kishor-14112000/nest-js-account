import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsEntity } from 'src/entities/accounts.entity';
import { NarrationEntity } from 'src/entities/narration.entity';
import { DataSource, Repository } from 'typeorm';
const POST_NARRATION_DATA = process.env.POST_NARRATION_DATA;
console.log("🚀 ~ POST_NARRATION_DATA:", POST_NARRATION_DATA)

@Injectable()
export class NarrationService {
  constructor(
    @InjectRepository(NarrationEntity)
    private readonly narrationEntity: Repository<NarrationEntity>,
    @InjectRepository(AccountsEntity)
    private readonly accountsEntity: Repository<AccountsEntity>,
    private dataSource: DataSource,
  ) {}

  async getAccounts(): Promise<AccountsEntity | any> {
    try {
      const account_data = await this.accountsEntity.find({
        select: ['id', 'name'],
        where: {
          status: 1,
        },
      });
      return account_data;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async getNarration(): Promise<NarrationEntity | any> {
    const narration_data = await this.dataSource.query(``);
  }

  async createNarration(payload: any): Promise<NarrationEntity | any> {
    try {
      if (payload.id && payload.id.trim() !== '') {
        await this.narrationEntity
          .createQueryBuilder()
          .update(POST_NARRATION_DATA)
          .set({
            name: payload.name,
            organization_id: payload.organization_id,
            account_id: payload.account_id,
          })
          .where('id = :id', { id: payload.id })
          .execute();
      } else {
        await this.narrationEntity
          .createQueryBuilder()
          .insert()
          .into(POST_NARRATION_DATA)
          .values({
            name: payload.name,
            organization_id: payload.organization_id,
            account_id: payload.account_id,
          })
          .execute();
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
