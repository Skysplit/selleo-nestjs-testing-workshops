import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';

export async function createTestingModule() {
  const testingModule = Test.createTestingModule({
    imports: [AppModule],
  });

  const compiledModule = await testingModule.compile();

  const app = compiledModule.createNestApplication<NestExpressApplication>(
    new ExpressAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.init();

  return app;
}
