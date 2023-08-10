import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChatRoomWithInterlocutorAndMessageEntity } from './entities/chat-room-with-interlocutor-and-message-entity';
import { FindManyChatRoomsWithInterlocutorAndMessage } from './use-case/find-chat-room-with-interlocutor-and-message';
import { UserOrCorporateAuthGuard } from 'src/common/guards/user-or-corporate-auth.guard';
import {
  UserOrCorporateAuth,
  UserOrCorporateAuthParam,
} from 'src/common/decorators/user-or-corporate-atuh.decorator';

@Controller('chat-room')
export class ChatRoomController {
  constructor(
    private readonly findManyChatRoomsWithInterlocutorAndMessage: FindManyChatRoomsWithInterlocutorAndMessage,
  ) {}

  //デフォルトのroom情報、相手のアイコン、名前、最新のメッセージ (自分も相手も含む) を返すapi
  @Get()
  @UseGuards(UserOrCorporateAuthGuard)
  async findRoomList(
    @UserOrCorporateAuth() operator: UserOrCorporateAuthParam,
  ): Promise<ChatRoomWithInterlocutorAndMessageEntity[]> {
    return await this.findManyChatRoomsWithInterlocutorAndMessage.handle(
      operator,
    );
  }
}
