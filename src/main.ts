import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config();

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.listen(process.env.PORT);
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

void bootstrap();
