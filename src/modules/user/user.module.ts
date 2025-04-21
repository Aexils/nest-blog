import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

import { UserController } from './api/controllers/user.controller';
import { SendLoginCodeService } from './services/send-login-code.service';
import { VerifyLoginCodeService } from './services/verify-login-code.service';
import { UpdatePasswordService } from './services/update-password.service';
import { USER_REPOSITORY } from './user.token';

import { UserDynamoRepository } from './adapters/repositories/user.dynamo-repository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET || 'changeme' }),
    MailerModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: DynamoDBDocumentClient,
      useFactory: () => {
        const client = new DynamoDBClient({ region: 'ca-central-1' });
        return DynamoDBDocumentClient.from(client);
      },
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserDynamoRepository,
    },
    SendLoginCodeService,
    VerifyLoginCodeService,
    UpdatePasswordService,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
