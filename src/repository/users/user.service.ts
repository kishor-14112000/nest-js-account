import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManageUsers } from '../../entities/manage-users.entity';
import { AuthService } from 'src/authentication/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ManageUsers)
    private readonly usersEntity: Repository<ManageUsers>,
    private readonly authService: AuthService,
  ) {}

  async validateUser(email: string, password: string, role: string): Promise<ManageUsers | null> {
    const user = await this.usersEntity.findOne({
      relations: ['organization_id'],
      select: ['id', 'name', 'organization_id', 'role'], 
      where: { email, password, role, status: 1 } });
    return user ? user : null;
  }

  async login(payload: { email: string; password: string, role: string }) {
    const user = await this.validateUser(payload.email, payload.password, payload.role);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials or User not found!');
    }
    return {
      token: this.authService.generateToken({ id: user.id, role: user.role }),
      user_data: user
    }
  }
}