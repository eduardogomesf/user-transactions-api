import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DB_CONNECTION_STRING,
  entities: ['dist/src/infra/database/relational/model/*{.ts,.js}'],
  migrations: ['dist/src/infra/database/relational/migration/*{.ts,.js}'],
};

export default config;
