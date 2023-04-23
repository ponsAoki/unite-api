import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitController } from './user-recruit.controller';
import { UserRecruitService } from './user-recruit.service';

@Module({
  controllers: [UserRecruitController],
  providers: [UserRecruitService, PrismaService],
})
export class UserRecruitModule {}
