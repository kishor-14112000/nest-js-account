import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class MaintainDocDTO {
  @IsUUID()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  header_account: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  receipt: string;

  @IsString()
  @IsNotEmpty()
  total_amount: string;

  @IsString()
  @IsNotEmpty()
  total_lines: string;
}