import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../../user/adapters/repositories/user.orm-entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  // 💥 lazy import ici aussi
  @ManyToOne(
    () => User,
    (user) => user.posts,
    { eager: true, onDelete: 'CASCADE' }
  )
  author!: any;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
