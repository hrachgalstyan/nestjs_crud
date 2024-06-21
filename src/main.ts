import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { setupSwagger } from '@Swagger/setup-swagger';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 5001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  app.setGlobalPrefix('/api');
  setupSwagger(app);

  await app.listen(PORT);

  console.log(`Application is running on: ${PORT}`);
}

bootstrap();
