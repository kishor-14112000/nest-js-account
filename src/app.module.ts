import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/postgres.db';
import { AuthModule } from './authentication/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './repository/accounts/accounts.module';
import { NarrationModule } from './repository/narration/narration.module';
import { DocumentModule } from './repository/maintain-document/md.module';
import { UserModule } from './repository/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    AccountsModule,
    NarrationModule,
    DocumentModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}