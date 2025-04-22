import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

export async function createApp(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.enableCors({
    origin: ['http://localhost:4200', 'https://blog.aexils.ca'],
    credentials: true,
  });

  await app.init();

  return app;
}
