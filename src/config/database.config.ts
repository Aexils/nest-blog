import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Post } from '../modules/post/entities/post.entity';
import { User } from '../modules/user/entities/user.entity';

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
    entities: [Post, User],
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/migrations/*{.js}'], // IMPORTANT: runtime = fichiers JS compilés
    logging: true,
  }),
};
