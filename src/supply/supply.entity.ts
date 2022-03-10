import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Book } from '../book/book.entity';
import { SupplyStatus } from './supply.constants';

@Entity()
export class Supply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.supplies)
  book: Book;

  @Column({ type: 'enum', enum: SupplyStatus })
  @Index()
  status: SupplyStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
