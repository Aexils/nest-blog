import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './adapters/repositories/post.orm-entity';
import { PostController } from './api/controllers/post.controller';
import { CreatePostService } from './services/create-post.service';
import { PostRepositoryImpl } from './adapters/repositories/post.repository.impl';
import { POST_REPOSITORY } from './post.token';
import { GetAllPostsService } from './services/get-all-posts.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    JwtModule.register({ secret: process.env.JWT_SECRET || 'changeme' }),
  ],
  controllers: [PostController],
  providers: [
    {
      provide: POST_REPOSITORY,
      useClass: PostRepositoryImpl
    },
    CreatePostService,
    GetAllPostsService
  ],
})
export class PostModule {}
