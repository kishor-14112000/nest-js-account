import { Module } from '@nestjs/common';
import { UserController } from '../repository/users/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageUsers } from '../entities/manage-users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../repository/users/user.service';
import { AuthService } from './auth.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([ManageUsers]),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '8h' }
        })
    ],
    providers: [UserService, AuthService],
    controllers: [UserController],
    exports: [AuthService, JwtModule],
})

export class AuthModule {}