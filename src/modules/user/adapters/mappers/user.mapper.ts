import { UserDynamo } from '../repositories/user.dynamo.interface';
import { User, User as DomainUser } from '../../domain/entities/user.entity';

export class UserDynamoMapper {
  static toItem(domain: DomainUser): UserDynamo {
    return {
      PK: `USER#${domain.id}`,
      email: domain.email,
      name: domain.name,
      password: domain.password,
      isPasswordResetRequired: domain.isPasswordResetRequired,
      createdAt: domain.createdAt.toISOString(),
      updatedAt: domain.updatedAt.toISOString(),
      pendingLoginCode: domain.pendingLoginCode,
      pendingLoginCodeExpiresAt:
        domain.pendingLoginCodeExpiresAt?.toISOString(),
    };
  }

  static toDomain(
    item:
      | Record<string, any>
      | Record<
          string,
          | AttributeValue.BMember
          | AttributeValue.BOOLMember
          | AttributeValue.BSMember
          | AttributeValue.LMember
          | AttributeValue.MMember
          | AttributeValue.NMember
          | AttributeValue.NSMember
          | AttributeValue.NULLMember
          | AttributeValue.SMember
          | AttributeValue.SSMember
          | AttributeValue.$UnknownMember
        >,
  ): User {
    return new DomainUser(
      item.PK.replace('USER#', ''),
      item.email,
      item.name,
      item.password,
      item.isPasswordResetRequired,
      new Date(item.createdAt),
      new Date(item.updatedAt),
      item.pendingLoginCode,
      item.pendingLoginCodeExpiresAt
        ? new Date(item.pendingLoginCodeExpiresAt)
        : undefined,
    );
  }
}
