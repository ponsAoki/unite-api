import { Injectable } from '@nestjs/common';
import { ChatRoomParticipant, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomParticipantInput } from './dto/chat-room-participant.input';

@Injectable()
export class ChatRoomParticipantService {
  constructor(private readonly prismaService: PrismaService) {}

  findManyByUserId(userId: string): PrismaPromise<ChatRoomParticipant[]> {
    return this.prismaService.chatRoomParticipant.findMany({
      where: { userId },
    });
  }

  find(id: string): PrismaPromise<ChatRoomParticipant | null> {
    return this.prismaService.chatRoomParticipant.findFirst({ where: { id } });
  }

  findByRoomIdAndUserId(
    input: ChatRoomParticipantInput,
  ): PrismaPromise<ChatRoomParticipant | null> {
    return this.prismaService.chatRoomParticipant.findFirst({
      where: { roomId: input.roomId, userId: input.userId },
    });
  }

  //roomIdと操作者であるチャット参加者のuserIdを用いて、操作者の対話相手となるチャット参加者を取得するメソッド
  findInterlocutor(
    roomId: string,
    operatorUserId: string,
  ): PrismaPromise<ChatRoomParticipant | null> {
    return this.prismaService.chatRoomParticipant.findFirst({
      where: {
        roomId,
        NOT: {
          userId: operatorUserId,
        },
      },
    });
  }

  create(input: ChatRoomParticipantInput): PrismaPromise<ChatRoomParticipant> {
    return this.prismaService.chatRoomParticipant.create({ data: input });
  }
}
