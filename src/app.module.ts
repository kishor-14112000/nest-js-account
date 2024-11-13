import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/postgres.db';
import { AuthModule } from './authentication/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}