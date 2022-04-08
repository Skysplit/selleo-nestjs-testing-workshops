import { AuthorService } from '@author/author.service';

import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    console.log(AuthorService);
  });

  test('true', () => {
    expect(true).toBe(true);
  });
});
