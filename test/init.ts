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
import { UpdateFileToFirebaseStorage } from 'src/common/file/update-file-service';
import { UpdateFileToFirebaseStorageMock } from './mock/update-file-to-firebase-storage.mock';
import { DeleteFileToFirebaseStorage } from 'src/common/file/delete-file-to-firebase-storage';
import { DeleteFileToFirebaseStorageMock } from './mock/delete-file-from-firebase-strage.mock';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';
import { UploadFileToFirebaseStorageMock } from './mock/upload-file-service.mock';
import { ChatAuthGuard } from 'src/common/guards/chat-auth.guard';
import { ChatAuthGuardMock } from './mock/chat/chat-auth.guard.mock';

export const initTest = (): void => {
  dotenv.config({ path: __dirname + '/../.env.e2e', override: true });
};

export const initTestApplication = async () => {
  const testingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  })
    // Serviceクラスをモッキング
    .overrideProvider(UtilService)
    .useClass(UtilServiceMock)
    .overrideProvider(AuthService)
    .useClass(AuthServiceMock)
    .overrideProvider(CorporateAuthService)
    .useClass(CorporateAuthServiceMock)
    // Guardクラスをモッキング
    .overrideProvider(UpdateFileToFirebaseStorage)
    .useClass(UpdateFileToFirebaseStorageMock)
    .overrideProvider(DeleteFileToFirebaseStorage)
    .useClass(DeleteFileToFirebaseStorageMock)
    .overrideProvider(UploadFileToFirebaseStorage)
    .useClass(UploadFileToFirebaseStorageMock)
    .overrideGuard(AuthGuard)
    .useClass(AuthGuardMock)
    .overrideGuard(CorporateAuthGuard)
    .useClass(CorporateAuthGuardMock)
    .overrideGuard(ChatAuthGuard)
    .useClass(ChatAuthGuardMock);

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
