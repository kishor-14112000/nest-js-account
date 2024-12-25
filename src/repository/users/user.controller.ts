import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import 'dotenv/config';
import { LoginDto } from 'src/dto/user-login.dto';
import { Response, Request } from 'express';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    try {
      const token = await this.userService.login(payload);
      res.cookie('user-session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return res.status(200).json({
        message: 'Successfully Logged In!',
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}