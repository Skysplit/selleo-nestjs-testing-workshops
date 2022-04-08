import { Book } from '@book/book.entity';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { Repository } from 'typeorm';

import { createAuthor, createBook } from './factories';
import { getApplication } from './helpers/getApplication';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    app = await getApplication();
    bookRepository = app.get(getRepositoryToken(Book));
  });

  it('/book (POST)', async () => {
    const author = await createAuthor();

    const { body } = await request(app.getHttpServer())
      .post('/book')
      .field('isbn', '9788374323574')
      .field('title', 'Test Book')
      .field('subtitle', 'Test subtitle')
      .field('authorIds[0]', author.id)
      .attach('cover', __dirname + '/fixtures/kitten.jpeg')
      .expect(201);

    const foundBook = await bookRepository.findOne(body.id, {
      relations: ['authors'],
    });

    expect(foundBook).not.toBeNull();
    expect(foundBook?.authors).toHaveLength(1);
    expect(body.title).toEqual('Test Book');
    expect(body.subtitle).toEqual('Test subtitle');
    expect(body.isbn).toEqual('9788374323574');
    expect(body.authors).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: author.id })]),
    );
  });

  it('/book/:id (PATCH)', async () => {
    const [author1, author2, author3] = await Promise.all([
      createAuthor(),
      createAuthor(),
      createAuthor(),
    ]);

    const { id: bookId } = await createBook({
      authors: [author3],
      isbn: '1234567890123',
    });

    const { body } = await request(app.getHttpServer())
      .put(`/book/${bookId}`)
      .send({
        isbn: '9788374323574',
        title: 'New title',
        subtitle: 'New subtitle',
        authorIds: [author1.id, author2.id],
      });

    const foundBook = await bookRepository.findOne(bookId, {
      relations: ['authors'],
    });

    expect(foundBook).not.toBeNull();
    expect(foundBook?.authors).toHaveLength(2);
    expect(body.title).toEqual('New title');
    expect(body.subtitle).toEqual('New subtitle');
    expect(body.authors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: author1.id }),
        expect.objectContaining({ id: author2.id }),
      ]),
    );
  });
});
