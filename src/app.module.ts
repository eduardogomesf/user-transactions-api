import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '@/shared/configuration';
import { AuthController, HealthController, UserController } from '@/api/http';
import { UserModel } from '@/infra/database/relational/model';
import {
  AddNewUserUseCase,
  AuthenticateUserUseCase,
} from '@/application/use-case';
import {
  HashingServiceProvider,
  IdGeneratorServiceProvider,
  UserRepositoryProvider,
  TokenServiceProvider,
} from '@/infra/nestjs/provider';
import typeormConfig from '@/infra/database/relational/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [HealthController, UserController, AuthController],
  providers: [
    Configuration,
    AddNewUserUseCase,
    UserRepositoryProvider,
    HashingServiceProvider,
    IdGeneratorServiceProvider,
    AuthenticateUserUseCase,
    TokenServiceProvider,
  ],
})
export class AppModule {}
