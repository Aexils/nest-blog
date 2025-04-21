import { Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User as DomainUser } from '../../domain/entities/user.entity';
import { UserDynamoMapper } from '../mappers/user.mapper';

@Injectable()
export class UserDynamoRepository implements UserRepository {
  private readonly tableName = process.env.USERS_TABLE_NAME!;

  constructor(private readonly client: DynamoDBDocumentClient) {}

  async findByEmail(email: string): Promise<DomainUser | null> {
    const result = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { PK: `USER#${email}` },
      }),
    );
    return result.Item ? UserDynamoMapper.toDomain(result.Item) : null;
  }

  async findById(id: string): Promise<DomainUser | null> {
    const result = await this.client.send(
      new GetCommand({ TableName: this.tableName, Key: { PK: `USER#${id}` } }),
    );
    return result.Item ? UserDynamoMapper.toDomain(result.Item) : null;
  }

  async create(user: DomainUser): Promise<DomainUser> {
    const item = UserDynamoMapper.toItem(user);
    await this.client.send(
      new PutCommand({ TableName: this.tableName, Item: item }),
    );
    return user;
  }

  async save(user: DomainUser): Promise<DomainUser> {
    return this.create(user); // même logique ici
  }
}
