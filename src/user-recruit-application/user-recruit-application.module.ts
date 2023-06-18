import { Module } from '@nestjs/common';
import { ChatRoomMessageService } from 'src/chat-room-message/chat-room-message.service';
import { ChatRoomParticipantService } from 'src/chat-room-participant/chat-room-participant.service';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UserService } from 'src/user/user.service';
import { ApplyForUserRecruit } from './use-case/apply-for-user-recruit';
import { UserRecruitApplicationController } from './user-recruit-application.controller';
import { UserRecruitApplicationService } from './user-recruit-application.service';

@Module({
  controllers: [UserRecruitApplicationController],
  providers: [
    UserRecruitApplicationService,
    PrismaService,
    ApplyForUserRecruit,
    UserService,
    ChatRoomService,
    ChatRoomParticipantService,
    UserRecruitService,
    ChatRoomMessageService,
  ],
})
export class UserRecruitApplicationModule {}
