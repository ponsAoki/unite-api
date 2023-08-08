import { Injectable } from '@nestjs/common';
import { ChatRoomParticipant, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomParticipantInput } from './dto/chat-room-participant.input';

@Injectable()
export class ChatRoomParticipantService {
  constructor(private readonly prismaService: PrismaService) {}

  findManyByUserIdOrEmployeeId(input: {
    userId?: string;
    employeeId?: string;
  }): PrismaPromise<ChatRoomParticipant[]> {
    return this.prismaService.chatRoomParticipant.findMany({
      where: { userId: input.userId, employeeId: input.employeeId },
    });
  }

  find(id: string): PrismaPromise<ChatRoomParticipant | null> {
    return this.prismaService.chatRoomParticipant.findFirst({ where: { id } });
  }

  findByRoomIdAndUserIdOrEmployeeId(
    input: ChatRoomParticipantInput,
  ): PrismaPromise<ChatRoomParticipant | null> {
    return this.prismaService.chatRoomParticipant.findFirst({
      where: {
        roomId: input.roomId,
        userId: input.userId,
        employeeId: input.employeeId,
      },
    });
  }

  //roomIdと操作者であるチャット参加者のuserIdを用いて、操作者の対話相手となるチャット参加者を取得するメソッド
  findInterlocutor(
    roomId: string,
    operatorInfo: { userId?: string; employeeId?: string },
  ): PrismaPromise<ChatRoomParticipant | null> {
    switch (true) {
      case !!operatorInfo.userId:
        return this.prismaService.chatRoomParticipant.findFirst({
          where: {
            roomId,
            OR: [
              {
                NOT: {
                  userId: operatorInfo.userId,
                },
              },
              { userId: null },
            ],
          },
        });
      case !!operatorInfo.employeeId:
        return this.prismaService.chatRoomParticipant.findFirst({
          where: {
            roomId,
            OR: [
              {
                NOT: {
                  employeeId: operatorInfo.employeeId,
                },
              },
              { employeeId: null },
            ],
          },
        });
      default:
        return null;
    }
  }

  create(
    input: ChatRoomParticipantInput,
    id?: string,
  ): PrismaPromise<ChatRoomParticipant> {
    return this.prismaService.chatRoomParticipant.create({
      data: { ...input, id },
    });
  }
}
