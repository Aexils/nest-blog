import { UserDynamo } from '../repositories/user.dynamo.interface';
import { User as DomainUser } from '../../domain/entities/user.entity';

export class UserDynamoMapper {
  static toItem(domain: DomainUser): UserDynamo {
    return {
      PK: this.buildPK(domain.id),
      SK: 'PROFILE',
      email: domain.email,
      name: domain.name,
      password: domain.password,
      isPasswordResetRequired: domain.isPasswordResetRequired,
      createdAt: domain.createdAt.toISOString(),
      updatedAt: domain.updatedAt.toISOString(),
      pendingLoginCode: domain.pendingLoginCode,
      pendingLoginCodeExpiresAt: domain.pendingLoginCodeExpiresAt?.toISOString(),
    };
  }

  static toDomain(item: Record<string, any>): DomainUser {
    return new DomainUser(
      this.extractId(item.PK),
      item.email,
      item.name,
      item.password,
      item.isPasswordResetRequired,
      new Date(item.createdAt),
      new Date(item.updatedAt),
      item.pendingLoginCode,
      item.pendingLoginCodeExpiresAt ? new Date(item.pendingLoginCodeExpiresAt) : undefined,
    );
  }

  private static buildPK(emailOrId: string): string {
    return `USER#${emailOrId}`;
  }

  private static extractId(pk: string): string {
    return pk.replace('USER#', '');
  }
}
