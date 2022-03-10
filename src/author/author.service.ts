import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthorDTO } from './author.dto';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) protected authorRepository: Repository<Author>,
  ) {}

  async create(author: AuthorDTO) {
    // TODO
  }

  async update(id: Author['id'], author: AuthorDTO) {
    // TODO
  }

  async delete(id: Author['id']) {
    // TODO
  }
}
