import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatRoomParticipantEntity } from './entities/chat-room-participant.entity';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { FindChatRoomParticipantByRoomId } from './use-case/find-chat-room-participant-by-room-id';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('chat-room-participant')
export class ChatRoomParticipantController {
  constructor(
    private readonly findChatRoomParticipantByRoomId: FindChatRoomParticipantByRoomId,
  ) {}

  @Get(':roomId')
  @UseGuards(AuthGuard)
  async findByRoomId(
    @FirebaseAuth() authUser: any,
    @Param('roomId') roomId: string,
  ): Promise<ChatRoomParticipantEntity> {
    return await this.findChatRoomParticipantByRoomId.handle(
      authUser.uid,
      roomId,
    );
  }
}
