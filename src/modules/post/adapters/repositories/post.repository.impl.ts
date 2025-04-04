import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostRepository } from '../../domain/repositories/post.repository';
import { Post as OrmPost } from './post.orm-entity';
import { Post } from '../../domain/entities/post.entity';
import { PostMapper } from '../mappers/post.mapper';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @InjectRepository(OrmPost)
    private readonly repo: Repository<OrmPost>
  ) {}

  async create(post: Post): Promise<Post> {
    const ormPost = PostMapper.toOrm(post);
    const saved = await this.repo.save(ormPost);
    return PostMapper.toDomain(saved);
  }

  async findAll(): Promise<Post[]> {
    const result = await this.repo.find();
    return result.map(PostMapper.toDomain);
  }
}
