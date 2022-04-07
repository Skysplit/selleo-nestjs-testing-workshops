import faker from '@faker-js/faker';
import { Factory } from 'rosie';

import { Book } from '../../src/book/book.entity';
import { create } from '../helpers/create';

Factory.define<Book>(Book.name).attrs({
  title: () => faker.commerce.productName(),
  subtitle: () => faker.commerce.product(),
});

export async function createBook(attributes?: Partial<Book>) {
  return await create(Book, attributes);
}
