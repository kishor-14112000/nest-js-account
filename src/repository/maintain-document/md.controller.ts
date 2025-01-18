import { Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/jwtAuthGuard';
import { Controller, Get, Post, Res, Body, UseGuards, Req } from '@nestjs/common';
import { MaintainDocService } from './md.service';

@Controller('md')
export class DocContoller {
  constructor(private readonly maintainDocService: MaintainDocService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-document-types')
  async getDocumentTypes(@Res() res: Response) {
    try {
      const data = await this.maintainDocService.getDocumentTypes();
      return res.status(200).json({
        success: true,
        message: 'Maintain document data retrieved successfully.',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error retrieving maintain document data.',
        error: error,
      });
    }
  }

//   @UseGuards(JwtAuthGuard)
//   @Post('create-narration-data')
//   async createNarration(
//     @Body() payload: any,
//     @Req() req,
//     @Res() res: Response,
//   ) {
//     try {
//       const data = await this.narrationService.createNarration(payload);
//       return res.status(200).json({
//         success: true,
//         message: 'Narration data created successfully.',
//         data,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: 'Error retrieving creating narration data.',
//         error: error,
//       });
//     }
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post('delete-narration-data')
//   async deleteNarration(
//     @Body() payload: any,
//     @Req() req,
//     @Res() res: Response,
//   ) {
//     try {
//       const data = await this.narrationService.deleteNarrationData(payload);
//       return res.status(200).json({
//         success: true,
//         message: 'Narration data deleted successfully.',
//         data,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: 'Error while deleting narration data.',
//         error: error,
//       });
//     }
//   }
}
