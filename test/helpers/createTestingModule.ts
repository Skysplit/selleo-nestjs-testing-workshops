import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';

export async function createTestingModule() {
  const testingModule = Test.createTestingModule({
    imports: [AppModule],
  });

  const compiledModule = await testingModule.compile();

  const app = compiledModule.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.init();

  return app;
}
