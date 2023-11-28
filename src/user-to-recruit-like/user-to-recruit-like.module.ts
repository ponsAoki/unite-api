import { Module } from '@nestjs/common';
import { UserToRecruitLikeController } from './user-to-recruit-like.controller';
import { UserToRecruitLikeService } from './user-to-recruit-like.service';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UserService } from 'src/user/user.service';
import { CreateUserToRecruitLike } from './use-case/create-user-to-recruit-like';
import { DeleteUserToRecruitLikeService } from './use-case/delete-user-to-recruit-like';

@Module({
  controllers: [UserToRecruitLikeController],
  providers: [
    UserToRecruitLikeService,
    PrismaService,
    UserRecruitService,
    UserService,
    CreateUserToRecruitLike,
    DeleteUserToRecruitLikeService,
  ],
})
export class UserToRecruitLikeModule {}
