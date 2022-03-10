import faker from '@faker-js/faker';
import { Factory } from 'rosie';

import { Author } from '../../src/author/author.entity';
import { create } from '../helpers/create';

Factory.define<Author>(Author.name).attrs({
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  bio: () => faker.name.jobDescriptor(),
});

export function createAuthor(attrs?: Partial<Author>) {
  return create(Author, attrs);
}
