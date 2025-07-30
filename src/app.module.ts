import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '@/shared/configuration';
import { HealthController } from '@/api/http';
import { UserModel } from '@/infra/database/relational/model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [Configuration],
      useFactory: (configs: Configuration) => ({
        type: 'postgres',
        url: configs.relationalDb.url,
        entities: [UserModel],
      }),
    }),
  ],
  controllers: [HealthController],
  providers: [Configuration],
})
export class AppModule {}
