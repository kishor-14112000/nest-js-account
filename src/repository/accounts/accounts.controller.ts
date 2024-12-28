import 'dotenv/config';
import { Response } from 'express';
import { AccountService } from './accounts.service';
import { JwtAuthGuard } from 'src/authentication/jwtAuthGuard';
import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

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

  @UseGuards(JwtAuthGuard)
  @Post('create-account')
  async createAccount(@Body() payload: any, @Req() req, @Res() res: Response) {
    try {
      const created_by = req.user.userId;
      payload.created_by = created_by;
      const data = await this.accountService.createAccount(payload);
      return res.status(200).json({
        success: true,
        message: 'Account created successfully.',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error while creating account.',
        error: error,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-account-data')
  async getAccountData(@Res() res: Response) {
    try {
      const data = await this.accountService.getAccountData();
      return res.status(200).json({
        success: true,
        message: 'Account data retrieved successfully.',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving Account data.',
        error: error,
      });
    }
  }
}
