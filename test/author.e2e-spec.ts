import { Author } from '@author/author.entity';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createAuthor } from '@test/factories';
import { getApplication } from '@test/helpers';
import request from 'supertest';
import { Repository } from 'typeorm';

describe('AuthorController', () => {
  let app: INestApplication;
  let authorRepository: Repository<Author>;

  beforeEach(async () => {
    app = await getApplication();
    authorRepository = app.get(getRepositoryToken(Author));
  });

  describe('POST /author - when creating an author', () => {
    it('should add author entry to database', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/author')
        .send({
          firstName: 'Jan',
          lastName: 'Kowalski',
          bio: 'Znany adresat listów w Polsce',
        });

      const foundAuthor = await authorRepository.findOne(body.id);

      expect(foundAuthor).toBeTruthy();
      expect(statusCode).toEqual(201);
      expect(body.firstName).toEqual(foundAuthor?.firstName);
      expect(body.lastName).toEqual(foundAuthor?.lastName);
      expect(body.bio).toEqual(foundAuthor?.bio);
    });
  });

  describe('DELETE /author/:id - when removing an author', () => {
    it('should delete author entry from database', async () => {
      const author = await createAuthor();

      const { body, statusCode } = await request(app.getHttpServer()).delete(
        `/author/${author.id}`,
      );

      const deletedAuthor = await authorRepository.findOne(author.id);

      expect(statusCode).toEqual(200);
      expect(deletedAuthor).toBeFalsy();
      expect(body.id).toEqual(author.id);
      expect(body.firstName).toEqual(author.firstName);
      expect(body.lastName).toEqual(author.lastName);
      expect(body.bio).toEqual(author.bio);
    });

    it('should throw error when author does not exist already', async () => {
      const { statusCode } = await request(app.getHttpServer()).delete(
        '/author/1',
      );

      expect(statusCode).toEqual(404);
    });
  });

  describe('PUT /author/:id - when updating an author', () => {
    it('should update author database entry', async () => {
      const author = await createAuthor();
      const updateAutorData = {
        firstName: 'New name',
        lastName: 'New last name',
        bio: 'New bio',
      };

      const { body } = await request(app.getHttpServer())
        .put(`/author/${author.id}`)
        .send(updateAutorData);

      const foundAuthor = await authorRepository.findOne(author.id);

      expect(foundAuthor).toBeTruthy();
      expect(author.id).toEqual(foundAuthor?.id);
      expect(foundAuthor?.firstName).toEqual(updateAutorData.firstName);
      expect(foundAuthor?.lastName).toEqual(updateAutorData.lastName);
      expect(foundAuthor?.bio).toEqual(updateAutorData.bio);
      expect(body.firstName).toEqual(foundAuthor?.firstName);
      expect(body.lastName).toEqual(foundAuthor?.lastName);
      expect(body.bio).toEqual(foundAuthor?.bio);
    });
  });
});
