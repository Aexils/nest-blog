import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from '../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../user.token';
import bcrypt from 'bcrypt';

@Injectable()
export class SendLoginCodeService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,

    private readonly mailer: MailerService,
  ) {}

  async execute(email: string, password: string): Promise<void> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('User not found');

    if (!await bcrypt.compare(password, user.password)) throw new UnauthorizedException('Mot de passe incorrect');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.pendingLoginCode = code;
    user.pendingLoginCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.userRepo.save(user);

    await this.mailer.sendMail({
      to: email,
      subject: 'Your login code',
      text: `Code: ${code}`,
    });
  }
}
