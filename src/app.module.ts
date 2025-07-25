import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from '@/shared/configuration';
import { HealthController } from '@/api/http';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [HealthController],
  providers: [Configuration],
})
export class AppModule {}
