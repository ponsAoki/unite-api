import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomParticipantService } from './chat-room-participant.service';
import { ChatRoomParticipantController } from './chat-room-participant.controller';
import { FindChatRoomParticipantByRoomId } from './use-case/find-chat-room-participant-by-room-id';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    ChatRoomParticipantService,
    PrismaService,
    FindChatRoomParticipantByRoomId,
  ],
  controllers: [ChatRoomParticipantController],
  exports: [ChatRoomParticipantService],
})
export class ChatRoomParticipantModule {}
