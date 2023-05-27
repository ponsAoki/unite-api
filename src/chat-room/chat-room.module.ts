import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomService } from './chat-room.service';

@Module({
  providers: [ChatRoomService, PrismaService],
})
export class ChatRoomModule {}
