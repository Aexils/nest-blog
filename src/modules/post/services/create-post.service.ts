import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../domain/repositories/post.repository';
import { Post } from '../domain/entities/post.entity';
import { v4 as uuidv4 } from 'uuid';
import { POST_REPOSITORY } from '../post.token';

@Injectable()
export class CreatePostService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository
  ) {}

  async execute(title: string, content: string, authorId: string): Promise<Post> {
    const now = new Date();
    const post = new Post(uuidv4(), title, content, authorId, now, now);
    return this.postRepository.create(post);
  }
}
