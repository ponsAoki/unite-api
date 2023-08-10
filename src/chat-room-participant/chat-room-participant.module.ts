import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomParticipantService } from './chat-room-participant.service';
import { ChatRoomParticipantController } from './chat-room-participant.controller';
import { FindChatRoomParticipantByRoomIdAndUserId } from './use-case/find-chat-room-participant-by-room-id-and-user-id';
import { UserModule } from 'src/user/user.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { CorporationModule } from 'src/corporation/corporation.module';

@Module({
  imports: [UserModule, EmployeeModule, CorporationModule],
  providers: [
    ChatRoomParticipantService,
    PrismaService,
    FindChatRoomParticipantByRoomIdAndUserId,
  ],
  controllers: [ChatRoomParticipantController],
  exports: [ChatRoomParticipantService],
})
export class ChatRoomParticipantModule {}
