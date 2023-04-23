import { Module } from '@nestjs/common';
import { UtilService } from 'src/common/utils/util.service';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { RecruitController } from './recruit.controller';
import { RecruitService } from './recruit.service';
import { CreateUserRecruit } from './use-case/create-user-recruit';

@Module({
  controllers: [RecruitController],
  providers: [
    RecruitService,
    PrismaService,
    CreateUserRecruit,
    UtilService,
    UserRecruitService,
  ],
})
export class RecruitModule {}
