import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from '../book/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index({ fulltext: true })
  firstName!: string;

  @Column()
  @Index({ fulltext: true })
  lastName!: string;

  @Column({ type: 'text' })
  bio!: string;

  @ManyToMany(() => Book, (book) => book.authors, {
    cascade: true,
  })
  books!: Book[];
}
