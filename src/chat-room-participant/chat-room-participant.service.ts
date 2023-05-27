import { Injectable } from '@nestjs/common';
import { ChatRoomParticipant, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateChatRoomParticipantInput } from './dto/create-chat-room-participant.input';

@Injectable()
export class ChatRoomParticipantService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    input: CreateChatRoomParticipantInput,
  ): PrismaPromise<ChatRoomParticipant> {
    return this.prismaService.chatRoomParticipant.create({ data: input });
  }
}
