import { Injectable } from '@nestjs/common';
import { ChatRoom, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatRoomService {
  constructor(private readonly prismaService: PrismaService) {}

  findManyByIds(ids: string[]): PrismaPromise<ChatRoom[]> {
    return this.prismaService.chatRoom.findMany({ where: { id: { in: ids } } });
  }

  find(id: string): PrismaPromise<ChatRoom | null> {
    return this.prismaService.chatRoom.findFirst({ where: { id } });
  }

  create(id?: string): PrismaPromise<ChatRoom> {
    return this.prismaService.chatRoom.create({ data: { id } });
  }
}
