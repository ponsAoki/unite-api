import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { AppModule } from '../src/app.module';
import { UtilService } from '../src/common/utils/util.service';
import { AuthService } from '../src/common/auth/user/auth.service';
import { UtilServiceMock } from './mock/util.service.mock';
import { AuthServiceMock } from './mock/auth.service.mock';
import { PrismaService } from '../src/prisma.service';
import { AuthGuardMock } from './mock/auth.guard.mock';
import { AuthGuard } from 'src/common/guards/auth.guard';

export const initTest = (): void => {
  dotenv.config({ path: __dirname + '/../.env.e2e', override: true });
};

export const initTestApplication = async () => {
  const testingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  })
    // Services
    .overrideProvider(UtilService)
    .useClass(UtilServiceMock)
    .overrideProvider(AuthService)
    .useClass(AuthServiceMock)
    // Guards
    .overrideGuard(AuthGuard)
    .useClass(AuthGuardMock);

  const moduleFixture: TestingModule = await testingModuleBuilder.compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  return { app, prismaService };
};
