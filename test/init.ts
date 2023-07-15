import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { AppModule } from '../src/app.module';
import { UtilService } from '../src/common/utils/util.service';
import { AuthService } from '../src/common/auth/user/auth.service';
import { UtilServiceMock } from './mock/util.service.mock';
import { AuthServiceMock } from './mock/user/auth.service.mock';
import { PrismaService } from '../src/prisma.service';
import { AuthGuardMock } from './mock/user/auth.guard.mock';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CorporateAuthGuard } from 'src/common/guards/corporate-auth.guard';
import { CorporateAuthGuardMock } from './mock/corporation/corporateAuth.guard.mock';
import { CorporateAuthService } from 'src/common/auth/employee/corporate-auth.service';
import { CorporateAuthServiceMock } from './mock/corporation/corporateAuth.service.mock';

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
    .overrideProvider(CorporateAuthService)
    .useClass(CorporateAuthServiceMock)
    // Guards
    .overrideGuard(AuthGuard)
    .useClass(AuthGuardMock)
    .overrideGuard(CorporateAuthGuard)
    .useClass(CorporateAuthGuardMock);

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
