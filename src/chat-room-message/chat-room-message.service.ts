import { Injectable } from '@nestjs/common';
import { ChatRoomMessage, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateChatRoomMessageInput } from './dto/create-chat-room-message.input';

@Injectable()
export class ChatRoomMessageService {
  constructor(private readonly prismaService: PrismaService) {}

  findManyByRoomId(roomId: string): PrismaPromise<ChatRoomMessage[]> {
    return this.prismaService.chatRoomMessage.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
    });
  }

  create(input: CreateChatRoomMessageInput): PrismaPromise<ChatRoomMessage> {
    return this.prismaService.chatRoomMessage.create({ data: input });
  }
}
