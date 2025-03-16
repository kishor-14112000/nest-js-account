import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManageUsers } from '../../entities/manage-users.entity';
import { AuthService } from 'src/authentication/auth.service';
import { MailService } from 'src/config/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ManageUsers)
    private readonly usersEntity: Repository<ManageUsers>,
    private readonly authService: AuthService,
    private readonly mailService: MailService
  ) {}

  async validateUser(email: string, password: string): Promise<ManageUsers | null> {
    const user = await this.usersEntity.findOne({
      relations: ['organization_id'],
      select: ['id', 'name', 'organization_id', 'role'], 
      where: { email, password, status: 1 } });
    return user ? user : null;
  }

  async login(payload: { email: string; password: string}) {
    const user = await this.validateUser(payload.email, payload.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials or User not found!');
    }
    return {
      token: this.authService.generateToken({ id: user.id, role: user.role }),
      user_data: user
    }
  }

  async forgotPass(payload: any) {
    console.log("🚀 ~ UserService ~ forgotPass ~ payload:", payload)
    if (!payload.email) {
      throw new UnauthorizedException('Email is required!');
    }
    await this.mailService.sendForgotPasswordEmail(payload.email);
    return { message: 'Password reset request sent. Please check your inbox.' };
  }

}