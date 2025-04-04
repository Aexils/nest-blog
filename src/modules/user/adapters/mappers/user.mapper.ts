import { User as DomainUser } from '../../domain/entities/user.entity';
import { User as OrmUser } from '../repositories/user.orm-entity';

export class UserMapper {
  static toDomain(orm: OrmUser): DomainUser {
    return new DomainUser(
      orm.id,
      orm.email,
      orm.name,
      orm.password,
      orm.isPasswordResetRequired,
      orm.createdAt,
      orm.updatedAt,
      orm.pendingLoginCode,
      orm.pendingLoginCodeExpiresAt
    );
  }

  static toOrm(domain: DomainUser): OrmUser {
    const orm = new OrmUser();
    orm.id = domain.id;
    orm.email = domain.email;
    orm.name = domain.name;
    orm.password = domain.password;
    orm.isPasswordResetRequired = domain.isPasswordResetRequired;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.pendingLoginCode = domain.pendingLoginCode;
    orm.pendingLoginCodeExpiresAt = domain.pendingLoginCodeExpiresAt;
    return orm;
  }
}
