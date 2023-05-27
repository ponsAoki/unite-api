import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomParticipantService } from './chat-room-participant.service';

@Module({
  providers: [ChatRoomParticipantService, PrismaService],
})
export class ChatRoomParticipantModule {}
