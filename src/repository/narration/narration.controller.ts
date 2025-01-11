import { Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/jwtAuthGuard';
import { NarrationService } from './narration.service';
import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

@Controller('narration')
export class NarrationContoller {
  constructor(private readonly narrationService: NarrationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-accounts')
  async getAccounts(@Res() res: Response) {
    try {
      const data = await this.narrationService.getAccounts();
      return res.status(200).json({
        success: true,
        message: 'Narration data retrieved successfully.',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving narration data.',
        error: error,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-narration-data')
  async getNarrationData(@Res() res: Response) {
    try {
      const data = await this.narrationService.getNarration();
      return res.status(200).json({
        success: true,
        message: 'Narration data retrieved successfully.',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving narration data.',
        error: error,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-narration-data')
  async createNarration(
    @Body() payload: any,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const data = await this.narrationService.createNarration(payload);
      return res.status(200).json({
        success: true,
        message: 'Narration data created successfully.',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving creating narration data.',
        error: error,
      });
    }
  }
}
