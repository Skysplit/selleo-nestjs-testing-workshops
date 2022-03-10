import faker from '@faker-js/faker';
import { Factory } from 'rosie';

import { SupplyStatus } from '../../src/supply/supply.constants';
import { Supply } from '../../src/supply/supply.entity';

Factory.define<Supply>(Supply.name).attrs({
  status: () => faker.random.objectElement(SupplyStatus, 'value'),
});
