import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: { name: string; password: string }) {
    const user = await this.userService.validateUser(body.name, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.userService.login(user);
  }
}