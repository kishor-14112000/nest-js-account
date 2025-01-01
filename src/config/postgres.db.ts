import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.LOCAL_DB_HOST,
  port: parseInt(process.env.LOCAL_DB_PORT, 10) || 16050,
  username: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASSWORD,
  database: process.env.LOCAL_DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Set to true if you have a valid SSL certificate
  },
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false, // Set to false in production
  logging: false,
};