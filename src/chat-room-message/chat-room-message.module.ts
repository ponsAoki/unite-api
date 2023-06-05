import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomMessageService } from './chat-room-message.service';
import { ChatRoomMessageController } from './chat-room-message.controller';

@Module({
  providers: [ChatRoomMessageService, PrismaService],
  exports: [ChatRoomMessageService],
  controllers: [ChatRoomMessageController],
})
export class ChatRoomMessageModule {}
