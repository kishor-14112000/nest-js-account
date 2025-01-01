import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import 'dotenv/config';
import { LoginDto } from 'src/dto/user-login.dto';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    try {
      const data = await this.userService.login(payload);
      // res.cookie('user-session', data.token, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict',
      // });
      return res.status(200).json({
        message: 'Successfully Logged In!',
        user_data: {
          ...data.user_data,
          organization_id: data.user_data.organization_id?.id,
          token: data.token
       }
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    // res.clearCookie('user-session', {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict',
    // });
    return res.status(200).json({ message: 'Successfully logged out!' });
  }
}