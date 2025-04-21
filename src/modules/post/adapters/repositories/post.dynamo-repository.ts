import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';
import { PostDynamoMapper } from '../mappers/post.mapper';
import { Post as DomainPost } from '../../domain/entities/post.entity';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class PostDynamoRepository implements PostRepository {
  private readonly tableName = process.env.POSTS_TABLE_NAME!;

  constructor(private readonly client: DynamoDBDocumentClient) {}

  async create(post: DomainPost): Promise<DomainPost> {
    const item = PostDynamoMapper.toItem(post);
    await this.client.send(
      new PutCommand({ TableName: this.tableName, Item: item }),
    );
    return post;
  }

  async findAll(): Promise<DomainPost[]> {
    const { Items } = await this.client.send(
      new ScanCommand({ TableName: this.tableName }),
    );
    return (Items || []).map(PostDynamoMapper.toDomain);
  }
}
