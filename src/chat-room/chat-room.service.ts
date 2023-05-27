import { Injectable } from '@nestjs/common';
import { ChatRoom, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatRoomService {
  constructor(private readonly prismaService: PrismaService) {}

  findManyIds(ids: string[]): PrismaPromise<ChatRoom[]> {
    return this.prismaService.chatRoom.findMany({ where: { id: { in: ids } } });
  }

  create(): PrismaPromise<ChatRoom> {
    return this.prismaService.chatRoom.create({ data: {} });
  }
}
