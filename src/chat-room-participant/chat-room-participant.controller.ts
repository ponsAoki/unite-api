import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatRoomParticipantEntity } from './entities/chat-room-participant.entity';
import { FindChatRoomParticipantByRoomIdAndUserId } from './use-case/find-chat-room-participant-by-room-id-and-user-id';
import { UserOrCorporateAuthGuard } from 'src/common/guards/user-or-corporate-auth.guard';
import {
  UserOrCorporateAuth,
  UserOrCorporateAuthParam,
} from 'src/common/decorators/user-or-corporate-atuh.decorator';

@Controller('chat-room-participant')
export class ChatRoomParticipantController {
  constructor(
    private readonly findChatRoomParticipantByRoomIdAndUserId: FindChatRoomParticipantByRoomIdAndUserId,
  ) {}

  @Get(':roomId')
  @UseGuards(UserOrCorporateAuthGuard)
  async findByRoomIdAndUserId(
    @UserOrCorporateAuth() operator: UserOrCorporateAuthParam,
    @Param('roomId') roomId: string,
  ): Promise<ChatRoomParticipantEntity> {
    return await this.findChatRoomParticipantByRoomIdAndUserId.handle(
      operator,
      roomId,
    );
  }
}
