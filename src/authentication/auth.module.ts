import { forwardRef, Module } from '@nestjs/common';
import { UserController } from '../repository/users/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageUsers } from '../entities/manage-users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../repository/users/user.module';
import { AuthService } from './auth.service';
import { MailService } from 'src/config/email.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([ManageUsers]),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '8h' }
        }),
        forwardRef(() => UserModule)
    ],
    providers: [AuthService, MailService],
    controllers: [UserController],
    exports: [AuthService, MailService, JwtModule],
})

export class AuthModule {}