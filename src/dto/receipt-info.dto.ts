import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class ReceiptInfoDTO {
  @IsString()
  @IsNotEmpty()
  receipt_id: string;

  @IsString()
  @IsNotEmpty()
  narration: string;

  @IsUUID()
  @IsNotEmpty()
  account_id: string;

  @IsString()
  @IsNotEmpty()
  amount: string;
}