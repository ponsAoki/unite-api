import { Module } from '@nestjs/common';
import { UserRecruitParticipantController } from './user-recruit-participant.controller';
import { UserRecruitParticipantService } from './user-recruit-participant.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [UserRecruitParticipantController],
  providers: [UserRecruitParticipantService, PrismaService, UserService],
  exports: [UserRecruitParticipantService],
})
export class UserRecruitParticipantModule {}
