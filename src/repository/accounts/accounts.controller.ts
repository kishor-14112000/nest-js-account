import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import 'dotenv/config';
import { Response } from 'express';
import { AccountService } from './accounts.service';
import { JwtAuthGuard } from 'src/authentication/jwtAuthGuard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-dropdown-data')
  async getDropdownData(@Res() res: Response) {
    try {
      const data = await this.accountService.getDropdownData();
      return res.status(200).json({
        success: true,
        message: 'Dropdown data retrieved successfully.',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving dropdown data.',
        error: error,
      });
    }
  }
}
