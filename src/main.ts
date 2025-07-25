import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configuration } from '@/shared/configuration';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  const configs = app.select(AppModule).get(Configuration);

  await app.listen(configs.app.port, () =>
    logger.log(`Running on ${configs.app.port}`),
  );
}
bootstrap();
