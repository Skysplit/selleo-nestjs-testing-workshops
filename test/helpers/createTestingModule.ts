import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';

export async function createTestingModule() {
  const testingModule = Test.createTestingModule({
    imports: [AppModule],
  });

  const compiledModule = await testingModule.compile();

  const app = compiledModule.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return app;
}
