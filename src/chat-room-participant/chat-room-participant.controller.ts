import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatRoomParticipantEntity } from './entities/chat-room-participant.entity';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { FindChatRoomParticipantByRoomIdAndUserId } from './use-case/find-chat-room-participant-by-room-id-and-user-id';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('chat-room-participant')
export class ChatRoomParticipantController {
  constructor(
    private readonly findChatRoomParticipantByRoomIdAndUserId: FindChatRoomParticipantByRoomIdAndUserId,
  ) {}

  @Get(':roomId')
  @UseGuards(AuthGuard)
  async findByRoomIdAndUserId(
    @FirebaseAuth() authUser: any,
    @Param('roomId') roomId: string,
  ): Promise<ChatRoomParticipantEntity> {
    return await this.findChatRoomParticipantByRoomIdAndUserId.handle(
      authUser.uid,
      roomId,
    );
  }
}
