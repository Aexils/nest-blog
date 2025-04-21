import { Module } from '@nestjs/common';
import { PostController } from './api/controllers/post.controller';
import { CreatePostService } from './services/create-post.service';
import { GetAllPostsService } from './services/get-all-posts.service';
import { JwtModule } from '@nestjs/jwt';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { PostDynamoRepository } from './adapters/repositories/post.dynamo-repository';
import { POST_REPOSITORY } from './post.token';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET || 'changeme' }),
  ],
  controllers: [PostController],
  providers: [
    {
      provide: DynamoDBDocumentClient,
      useFactory: () => {
        const client = new DynamoDBClient({ region: 'ca-central-1' });
        return DynamoDBDocumentClient.from(client);
      },
    },
    {
      provide: POST_REPOSITORY,
      useClass: PostDynamoRepository,
    },
    CreatePostService,
    GetAllPostsService,
  ],
  exports: [POST_REPOSITORY],
})
export class PostModule {}
