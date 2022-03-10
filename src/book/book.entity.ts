import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Author } from '../author/author.entity';
import { Supply } from '../supply/supply.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 13 })
  @Index()
  isbn: string;

  @Column()
  @Index({ fulltext: true })
  title: string;

  @Column()
  @Index({ fulltext: true })
  subtitle: string;

  @ManyToMany(() => Author, (author) => author.books, {})
  @JoinTable({ name: 'book_author' })
  authors: Author[];

  @OneToMany(() => Supply, (supply) => supply.book, {
    cascade: true,
  })
  supplies: Supply[];
}
