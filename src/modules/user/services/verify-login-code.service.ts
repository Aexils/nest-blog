import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { USER_REPOSITORY } from '../user.token';

@Injectable()
export class VerifyLoginCodeService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async execute(email: string, code: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Utilisateur introuvable');

    const now = new Date();

    if (
      user.pendingLoginCode !== code ||
      !user.pendingLoginCodeExpiresAt ||
      user.pendingLoginCodeExpiresAt < now
    ) {
      throw new Error('Code invalide ou expiré');
    }

    user.pendingLoginCode = null;
    user.pendingLoginCodeExpiresAt = null;

    await this.userRepo.save(user);

    return this.jwt.sign({ sub: user.id, email: user.email });
  }
}
