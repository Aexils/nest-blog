import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.orm-entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.ormRepo.findOne({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findById(id: string) {
    const user = await this.ormRepo.findOne({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async create(userDomain: import('../../domain/entities/user.entity').User) {
    const ormUser = UserMapper.toOrm(userDomain);
    const saved = await this.ormRepo.save(ormUser);
    return UserMapper.toDomain(saved);
  }

  async save(userDomain: import('../../domain/entities/user.entity').User) {
    const ormUser = UserMapper.toOrm(userDomain);
    const saved = await this.ormRepo.save(ormUser);
    return UserMapper.toDomain(saved);
  }
}
