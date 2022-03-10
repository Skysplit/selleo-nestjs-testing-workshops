import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApplication } from './helpers/getApplication';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getApplication();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
