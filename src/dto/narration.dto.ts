import { IsString, IsNotEmpty } from 'class-validator';
import { UUID } from 'crypto';

export class NarrationDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    account_id: UUID

    @IsString()
    @IsNotEmpty()
    organization_id: UUID
}