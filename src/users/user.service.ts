// src/authentication/user.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManageUsers } from '../entities/manage-users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ManageUsers)
    private usersRepository: Repository<ManageUsers>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, role: string): Promise<ManageUsers | null> {
    const user = await this.usersRepository.findOne({ where: { email, password, role } });
    return user ? user : null;
  }

  async login(payload: { email: string; password: string, role: string }) {
    const user = await this.validateUser(payload.email, payload.password, payload.role);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials or User not found!');
    }

    const jwtPayload = { userId: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }
}