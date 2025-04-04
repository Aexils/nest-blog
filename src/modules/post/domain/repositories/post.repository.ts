import { Post } from '../entities/post.entity';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  findAll(): Promise<Post[]>;
}
