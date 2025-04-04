import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreatePostService } from '../../services/create-post.service';
import { GetAllPostsService } from '../../services/get-all-posts.service';
import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostService: CreatePostService,
    private readonly getAllPostsService: GetAllPostsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() dto: CreatePostDto) {
    const authorId = (req as any).user.userId;
    return this.createPostService.execute(dto.title, dto.content, authorId);
  }

  @Get()
  async findAll() {
    return this.getAllPostsService.execute();
  }
}
