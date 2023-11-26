import { Module } from '@nestjs/common';
import { UserRecruitParticipantController } from './user-recruit-participant.controller';
import { UserRecruitParticipantService } from './user-recruit-participant.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { CorporationModule } from 'src/corporation/corporation.module';
import { IsRelatedUserByRecruitIdService } from './use-case/is-related-user-by-recruit-id.service';
import { UserRecruitModule } from 'src/user-recruit/user-recruit.module';
import { ApproveParticipantUseCase } from './use-case/approveParticipant.usecase';

@Module({
  imports: [EmployeeModule, CorporationModule, UserRecruitModule],
  controllers: [UserRecruitParticipantController],
  providers: [
    UserRecruitParticipantService,
    PrismaService,
    UserService,
    IsRelatedUserByRecruitIdService,
    ApproveParticipantUseCase,
  ],
  exports: [UserRecruitParticipantService],
})
export class UserRecruitParticipantModule {}
