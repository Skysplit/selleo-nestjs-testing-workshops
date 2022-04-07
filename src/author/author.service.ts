import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { AuthorDTO } from './author.dto';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) protected authorRepository: Repository<Author>,
  ) {}

  async findAll(ids: Author['id'][]) {
    return await this.authorRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async find(id: Author['id']) {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  async create(author: AuthorDTO) {
    return await this.authorRepository.save(author);
  }

  async update(id: Author['id'], author: AuthorDTO) {
    const foundAuthor = await this.find(id);

    return this.authorRepository.save({
      ...foundAuthor,
      ...author,
    });
  }

  async delete(id: Author['id']) {
    const author = await this.find(id);

    await this.authorRepository.delete(id);

    return author;
  }
}
