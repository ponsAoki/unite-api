import { Module } from '@nestjs/common';
import { UtilService } from 'src/common/utils/util.service';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UserService } from 'src/user/user.service';
import { ManipulateUserRecruitPolicy } from './policy/manipulate-user-recruit.policy';
import { CreateUserRecruit } from './use-case/create-user-recruit';
import { DeleteUserRecruit } from './use-case/delete-user-recruit';
import { UpdateUserRecruit } from './use-case/update-user-recruit';
import { UserRecruitController } from './user-recruit.controller';

@Module({
  controllers: [UserRecruitController],
  providers: [
    UserRecruitService,
    PrismaService,
    UtilService,
    UserRecruitService,
    UpdateUserRecruit,
    ManipulateUserRecruitPolicy,
    DeleteUserRecruit,
    CreateUserRecruit,
    UserService,
  ],
  exports: [UserRecruitService],
})
export class UserRecruitModule {}
