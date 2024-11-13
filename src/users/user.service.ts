// src/authentication/user.service.ts
import { Injectable } from '@nestjs/common';
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

  async validateUser(name: string, password: string): Promise<ManageUsers | null> {
    const user = await this.usersRepository.findOne({ where: { name, password } });
    return user ? user : null;
  }

  async login(user: ManageUsers) {
    const payload = { userId: user.user_id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
