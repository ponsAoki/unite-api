import { Module } from '@nestjs/common';
import { UserToRecruitLikeController } from './user-to-recruit-like.controller';
import { UserToRecruitLikeService } from './user-to-recruit-like.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [UserToRecruitLikeController],
  providers: [
    UserToRecruitLikeService,
    UserService
  ]
})
export class UserToRecruitLikeModule {}
