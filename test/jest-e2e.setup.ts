import { Connection } from 'typeorm';

import { getApplication } from './helpers/getApplication';

beforeEach(async () => {
  const app = await getApplication();
  const connection = app.get(Connection);

  // Clear database
  await connection.undoLastMigration();

  // Run pending migrations
  await connection.runMigrations();
});

afterAll(async () => {
  const app = await getApplication();
  await app.close();
});
