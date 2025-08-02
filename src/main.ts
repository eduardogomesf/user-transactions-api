import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configuration } from '@/shared/configuration';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from 'package.json';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  // TO DO: add validation pipeline

  const configs = app.select(AppModule).get(Configuration);

  app.setGlobalPrefix(configs.app.basePath);

  const swaggerConfigs = new DocumentBuilder()
    .setTitle('User Transactions API')
    .setDescription(
      "This service is responsible for managing user's transactions",
    )
    .setVersion(version)
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfigs);

  SwaggerModule.setup(`${configs.app.basePath}`, app, swaggerDoc);

  await app.listen(configs.app.port, () =>
    logger.log(`Running on ${configs.app.port}`),
  );
}
bootstrap();
