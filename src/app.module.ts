import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '@/shared/configuration';
import { HealthController, UserController } from '@/api/http';
import { UserModel } from '@/infra/database/relational/model';
import { AddNewUserUseCase } from '@/application/use-case';
import {
  HashingServiceProvider,
  IdGeneratorServiceProvider,
  UserRepositoryProvider,
} from '@/infra/nestjs/provider';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_CONNECTION_STRING, // TO DO: use configuration instead of retrieving value from env
      entities: [UserModel],
    }),
    TypeOrmModule.forFeature([UserModel]), // Is calling forFeature after forRoot a good approach?
  ],
  controllers: [HealthController, UserController],
  providers: [
    Configuration,
    AddNewUserUseCase,
    UserRepositoryProvider,
    HashingServiceProvider,
    IdGeneratorServiceProvider,
  ],
})
export class AppModule {}
