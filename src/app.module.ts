import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/postgres.db';
import { AuthModule } from './authentication/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './repository/accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    AccountsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}