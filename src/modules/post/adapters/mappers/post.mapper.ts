import { Post as DomainPost } from '../../domain/entities/post.entity';
import { Post as OrmPost } from '../repositories/post.orm-entity';
import { User } from '../../../user/entities/user.entity';

export class PostMapper {
  static toDomain(orm: OrmPost): DomainPost {
    return new DomainPost(
      orm.id,
      orm.title,
      orm.content,
      orm.author?.id ?? '',
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(domain: DomainPost): OrmPost {
    const orm = new OrmPost();
    orm.id = domain.id;
    orm.title = domain.title;
    orm.content = domain.content;

    orm.author = { id: domain.authorId } as User;

    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;

    return orm;
  }
}
