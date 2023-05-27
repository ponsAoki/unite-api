import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomMessageService } from './chat-room-message.service';

@Module({
  providers: [ChatRoomMessageService, PrismaService],
})
export class ChatRoomMessageModule {}
