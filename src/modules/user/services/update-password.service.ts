import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserRepository } from '../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../user.token';

@Injectable()
export class UpdatePasswordService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(userId: string, current: string, next: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UnauthorizedException();

    const isValid = await bcrypt.compare(current, user.password);
    if (!isValid) throw new UnauthorizedException('Mot de passe incorrect');

    const hashed = await bcrypt.hash(next, 10);
    user.password = hashed;
    user.isPasswordResetRequired = false;

    await this.userRepo.save(user);
  }
}
