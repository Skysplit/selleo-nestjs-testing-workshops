import faker from '@faker-js/faker';
import { Factory } from 'rosie';

import { Book } from '../../src/book/book.entity';
import { create } from '../helpers/create';

Factory.define<Book>(Book.name).attrs({
  title: () => faker.commerce.productName(),
  subtitle: () => faker.commerce.product(),
  isbn: () =>
    faker.random.alphaNumeric(13, {
      bannedChars: [
        'q',
        'w',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
      ],
    }),
});

export async function createBook(attributes?: Partial<Book>) {
  return await create(Book, attributes);
}
