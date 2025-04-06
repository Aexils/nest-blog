import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import process from 'node:process';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });


  const port = process.env.PORT;
  await app.listen(port);
  console.log(`🚀 Server is running on port ${port}`);
}

void bootstrap();

