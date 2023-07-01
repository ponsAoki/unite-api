import { Module } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserPolicy } from './policy/create-user.policy';
import { CreateUser } from './use-case/create-user';
import { CreateUserWithEmail } from './use-case/create-user-with-email';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserWithGoogleOrGithubService } from './use-case/create-user-with-google-or-github.service';
import { UpdateFileToFirebaseStorage } from 'src/common/file/update-file-service';
import { DeleteFileToFirebaseStorage } from 'src/common/file/delete-file-to-firebaseStorage';
import { UploadFileToFirebaseStorage } from 'src/common/file/uplpad-fIle-to-firebaseStorage';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    CreateUserWithEmail,
    AuthService,
    CreateUser,
    CreateUserPolicy,
    CreateUserWithGoogleOrGithubService,
    UpdateFileToFirebaseStorage,
    DeleteFileToFirebaseStorage,
    UploadFileToFirebaseStorage,
  ],
  exports: [UserService],
})
export class UserModule {}
