import { DataSource } from 'typeorm';
import { Post } from './modules/post/adapters/repositories/post.orm-entity';
import { User } from './modules/user/adapters/repositories/user.orm-entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Post, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
