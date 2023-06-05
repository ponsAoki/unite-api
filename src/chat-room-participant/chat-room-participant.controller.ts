import { Controller, Get, Param } from '@nestjs/common';
import { ChatRoomParticipantService } from './chat-room-participant.service';
import { ChatRoomParticipantEntity } from './entities/chat-room-participant.entity';
import { ChatRoomParticipantInput } from './dto/chat-room-participant.input';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { FindChatRoomParticipantByRoomId } from './use-case/find-chat-room-participant-by-room-id';

@Controller('chat-room-participant')
export class ChatRoomParticipantController {
  constructor(
    private readonly findChatRoomParticipantByRoomId: FindChatRoomParticipantByRoomId,
  ) {}

  @Get(':roomId')
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
