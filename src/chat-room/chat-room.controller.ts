import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChatRoomWithInterlocutorAndMessageEntity } from './entities/chat-room-with-interlocutor-and-message-entity';
import { FindManyChatRoomsWithInterlocutorAndMessage } from './use-case/find-chat-room-with-interlocutor-and-message';
import { ChatAuthGuard } from 'src/common/guards/chat-auth.guard';
import {
  ChatAuth,
  ChatAuthParam,
} from 'src/common/decorators/chat-atuh.decorator';

@Controller('chat-room')
export class ChatRoomController {
  constructor(
    private readonly findManyChatRoomsWithInterlocutorAndMessage: FindManyChatRoomsWithInterlocutorAndMessage,
  ) {}

  //デフォルトのroom情報、相手のアイコン、名前、最新のメッセージ (自分も相手も含む) を返すapi
  @Get()
  @UseGuards(ChatAuthGuard)
  async findRoomList(
    @ChatAuth() operator: ChatAuthParam,
  ): Promise<ChatRoomWithInterlocutorAndMessageEntity[]> {
    return await this.findManyChatRoomsWithInterlocutorAndMessage.handle(
      operator,
    );
  }
}
