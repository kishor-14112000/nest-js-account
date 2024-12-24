import { Module } from '@nestjs/common';
import { UserController } from '../users/user.contoller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageUsers } from '../entities/manage-users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/users/user.service';
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
    exports: [AuthService],
})

export class AuthModule {}