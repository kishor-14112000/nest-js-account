import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class AccountsDTO {
    @IsUUID()
    @IsNotEmpty()
    organization_id: string

    @IsUUID()
    @IsNotEmpty()
    sub_account_id: string

    @IsUUID()
    @IsNotEmpty()
    acc_type_id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    alias_name: string

    @IsString()
    @IsNotEmpty()
    account_type: string

    @IsString()
    @IsNotEmpty()
    amount: string
}