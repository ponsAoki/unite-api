import { Injectable } from '@nestjs/common';
import { ChatRoomParticipant, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomParticipantInput } from './dto/chat-room-participant.input';

@Injectable()
export class ChatRoomParticipantService {
  constructor(private readonly prismaService: PrismaService) {}

  findByRoomIdAndUserId(
    input: ChatRoomParticipantInput,
  ): PrismaPromise<ChatRoomParticipant | null> {
    return this.prismaService.chatRoomParticipant.findFirst({
      where: { roomId: input.roomId, userId: input.userId },
    });
  }

  create(input: ChatRoomParticipantInput): PrismaPromise<ChatRoomParticipant> {
    return this.prismaService.chatRoomParticipant.create({ data: input });
  }
}
