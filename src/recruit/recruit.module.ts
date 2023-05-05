import { Module } from '@nestjs/common';
import { UtilService } from 'src/common/utils/util.service';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { ManipulateUserRecruitPolicy } from './policy/manipulate-user-recruit.policy';
import { RecruitController } from './recruit.controller';
import { RecruitService } from './recruit.service';
import { CreateUserRecruit } from './use-case/create-user-recruit';
import { DeleteUserRecruit } from './use-case/delete-user-recruit';
import { UpdateUserRecruit } from './use-case/update-user-recruit';

@Module({
  controllers: [RecruitController],
  providers: [
    RecruitService,
    PrismaService,
    CreateUserRecruit,
    UtilService,
    UserRecruitService,
    UpdateUserRecruit,
    ManipulateUserRecruitPolicy,
    DeleteUserRecruit,
  ],
})
export class RecruitModule {}
