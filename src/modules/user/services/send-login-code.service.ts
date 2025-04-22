import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from '../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../user.token';
import bcrypt from 'bcryptjs';

@Injectable()
export class SendLoginCodeService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,

    private readonly mailer: MailerService,
  ) {}

  async execute(email: string, password: string): Promise<void> {
    console.log('🔍 Step 1: Searching user in DB...');
    const user = await this.userRepo.findByEmail(email);

    console.log('🧠 Step 2: User found?');
    console.log(user);

    if (!user) {
      console.error('❌ User not found');
      throw new Error('User not found');
    }

    console.log('🔐 Step 3: Comparing password...');
    console.log(password);
    console.log(user.password);

    console.log('typeof bcrypt.compare', typeof bcrypt.compare);
    console.log('bcrypt lib:', bcrypt);

    let passwordMatch = bcrypt.compareSync(password, user.password);
    console.log('✅ Password match:', passwordMatch);

    if (!passwordMatch) {
      console.log('Mot de passe incorrect');
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('📮 Step 4: Generated code:', code);

    user.pendingLoginCode = code;
    user.pendingLoginCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    console.log('💾 Step 5: Calling save()...');
    try {
      console.log('typeof this.userRepo.save:', typeof this.userRepo.save);
      console.log('save toString:', this.userRepo.save?.toString?.());

      const savedUser = await this.userRepo.save(user);
      console.log('✅ Step 5.1: User saved:', savedUser);
    } catch (err) {
      console.error('❌ Step 5.2: Error during save:', err);
      throw err;
    }

    console.log('📤 Step 6: Sending email...');
    try {
      await this.mailer.sendMail({
        to: email,
        subject: 'Your login code',
        text: `Code: ${code}`,
      });
      console.log('✅ Step 6.1: Email sent');
    } catch (err) {
      console.error('❌ Step 6.2: Email sending failed:', err);
      throw err;
    }

    console.log('🎉 Step 7: Done!');
  }
}
