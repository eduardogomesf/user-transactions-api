import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from '@/shared/configuration';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [Configuration],
})
export class AppModule {}
