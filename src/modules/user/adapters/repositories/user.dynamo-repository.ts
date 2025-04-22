import { Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  PutCommand, QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User as DomainUser } from '../../domain/entities/user.entity';
import { UserDynamoMapper } from '../mappers/user.mapper';

@Injectable()
export class UserDynamoRepository implements UserRepository {
  private readonly tableName = process.env.USERS_TABLE_NAME!;

  constructor(private readonly client: DynamoDBDocumentClient) {}

  async findByEmail(email: string): Promise<DomainUser | null> {
    console.log('finding user from db');

    const result = await this.client.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
        ExpressionAttributeValues: {
          ':pk': `USER#${email}`,
          ':skPrefix': 'PROFILE',
        },
      }),
    );

    console.log('find by email');
    console.log(result.Items?.[0]);
    console.log('-----');

    return result.Items?.[0]
      ? UserDynamoMapper.toDomain(result.Items[0])
      : null;
  }

  async create(user: DomainUser): Promise<DomainUser> {
    const item = UserDynamoMapper.toItem(user);
    await this.client.send(
      new PutCommand({ TableName: this.tableName, Item: item }),
    );
    return user;
  }

  async save(user: DomainUser): Promise<DomainUser> {
    console.log('save function');
    console.log('mapping');
    const item = UserDynamoMapper.toItem(user);
    console.log('user ready to save');
    console.log(item);
    console.log('-----');
    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item,
      }),
    );

    return user;
  }
}
