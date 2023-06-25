import { Module } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserPolicy } from './policy/create-user.policy';
import { CreateUser } from './use-case/create-user';
import { CreateUserWithEmail } from './use-case/create-user-with-email';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserWithGoogleOrGithubService } from './use-case/create-user-with-google-or-github.service';

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
  ],
  exports: [UserService],
})
export class UserModule {}
