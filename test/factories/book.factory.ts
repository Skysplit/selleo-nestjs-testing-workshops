import faker from '@faker-js/faker';
import { Factory } from 'rosie';

import { Book } from '../../src/book/book.entity';

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
