import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { HealthModule } from './modules/health/health.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as aws from '@aws-sdk/client-ses';
import { SESClient } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          SES: { ses, aws },
        },
        defaults: {
          from: '"Aexils" <noreply@aexils.ca>', // ✅ domaine vérifié
        },
      }),
    }),
    UserModule,
    PostModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
