import { PostDynamo } from '../repositories/post.dynamo.interface';
import { Post as DomainPost } from '../../domain/entities/post.entity';

export class PostDynamoMapper {
  static toItem(post: DomainPost): PostDynamo {
    return {
      PK: `POST#${post.id}`,
      title: post.title,
      content: post.content,
      authorName: post.authorId, // ou mappe un vrai nom si tu veux
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }

  static toDomain(item: PostDynamo): DomainPost {
    return new DomainPost(
      item.PK.replace('POST#', ''),
      item.title,
      item.content,
      item.authorName,
      new Date(item.createdAt),
      new Date(item.updatedAt),
    );
  }
}
