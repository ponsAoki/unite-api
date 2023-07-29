import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomParticipantService } from './chat-room-participant.service';
import { ChatRoomParticipantController } from './chat-room-participant.controller';
import { FindChatRoomParticipantByRoomIdAndUserId } from './use-case/find-chat-room-participant-by-room-id-and-user-id';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    ChatRoomParticipantService,
    PrismaService,
    FindChatRoomParticipantByRoomIdAndUserId,
  ],
  controllers: [ChatRoomParticipantController],
  exports: [ChatRoomParticipantService],
})
export class ChatRoomParticipantModule {}
