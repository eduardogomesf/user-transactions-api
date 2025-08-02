import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configuration } from '@/shared/configuration';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from 'package.json';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  const configs = app.select(AppModule).get(Configuration);

  // App setup
  app.setGlobalPrefix(configs.app.basePath);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  const swaggerConfigs = new DocumentBuilder()
    .setTitle('User Transactions API')
    .setDescription(
      "This service is responsible for managing user's transactions",
    )
    .setVersion(version)
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfigs);

  SwaggerModule.setup(`${configs.app.basePath}`, app, swaggerDoc, {
    jsonDocumentUrl: `${configs.app.basePath}/json`,
  });

  // Start app
  await app.listen(configs.app.port, () =>
    logger.log(`Running on ${configs.app.port}`),
  );
}
bootstrap();
