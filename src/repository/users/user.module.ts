import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailService } from 'src/config/email.service';
import { ManageUsers } from 'src/entities/manage-users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManageUsers]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, MailService],
  exports: [UserService]
})
export class UserModule {}