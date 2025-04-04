import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

import { User } from './adapters/repositories/user.orm-entity';
import { UserController } from './api/controllers/user.controller';

import { SendLoginCodeService } from './services/send-login-code.service';
import { VerifyLoginCodeService } from './services/verify-login-code.service';
import { UpdatePasswordService } from './services/update-password.service';

import { UserRepositoryImpl } from './adapters/repositories/user.repository.impl';
import { USER_REPOSITORY } from './user.token';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.JWT_SECRET || 'changeme' }),
    MailerModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    SendLoginCodeService,
    VerifyLoginCodeService,
    UpdatePasswordService,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
