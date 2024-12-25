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
    debit: string

    @IsString()
    @IsNotEmpty()
    credit: string

    @IsNumber()
    @IsNotEmpty()
    status: number

    @IsString()
    @IsNotEmpty()
    role: string
}