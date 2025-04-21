import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import process from 'node:process';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors({
    origin: ['http://localhost:4200', 'https://blog.aexils.ca'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
  console.log(
    `🚀 App is running on http://localhost:${process.env.PORT || 3000}`,
  );
}

void bootstrap();
