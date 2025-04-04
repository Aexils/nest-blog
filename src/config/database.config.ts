import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User as UserOrm } from '../modules/user/adapters/repositories/user.orm-entity';
import { Post as PostOrm } from '../modules/post/adapters/repositories/post.orm-entity';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
    username: configService.get<string>('DB_USER', 'myuser'),
    password: configService.get<string>('DB_PASSWORD', 'mypassword'),
    database: configService.get<string>('DB_NAME', 'mydatabase'),
    entities: [PostOrm, UserOrm],
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/migrations/*{.js}'],
    logging: true,
  }),
};
