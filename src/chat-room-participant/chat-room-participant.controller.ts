import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatRoomParticipantEntity } from './entities/chat-room-participant.entity';
import { FindChatRoomParticipantByRoomIdAndUserId } from './use-case/find-chat-room-participant-by-room-id-and-user-id';
import { ChatAuthGuard } from 'src/common/guards/chat-auth.guard';
import {
  ChatAuth,
  ChatAuthParam,
} from 'src/common/decorators/chat-atuh.decorator';

@Controller('chat-room-participant')
export class ChatRoomParticipantController {
  constructor(
    private readonly findChatRoomParticipantByRoomIdAndUserId: FindChatRoomParticipantByRoomIdAndUserId,
  ) {}

  @Get(':roomId')
  @UseGuards(ChatAuthGuard)
  async findByRoomIdAndUserId(
    @ChatAuth() operator: ChatAuthParam,
    @Param('roomId') roomId: string,
  ): Promise<ChatRoomParticipantEntity> {
    return await this.findChatRoomParticipantByRoomIdAndUserId.handle(
      operator,
      roomId,
    );
  }
}
