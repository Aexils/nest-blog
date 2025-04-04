import { Injectable, Inject } from '@nestjs/common';
import { PostRepository } from '../domain/repositories/post.repository';
import { POST_REPOSITORY } from '../post.token';

@Injectable()
export class GetAllPostsService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepo: PostRepository
  ) {}

  async execute() {
    return this.postRepo.findAll();
  }
}
