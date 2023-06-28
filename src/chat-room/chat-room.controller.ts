import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChatRoomWithInterlocutorAndMessageEntity } from './entities/chat-room-with-interlocutor-and-message-entity';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { FindManyChatRoomsWithInterlocutorAndMessage } from './use-case/find-chat-room-with-interlocutor-and-message';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('chat-room')
export class ChatRoomController {
  constructor(
    private readonly findManyChatRoomsWithInterlocutorAndMessage: FindManyChatRoomsWithInterlocutorAndMessage,
  ) {}

  //デフォルトのroom情報、相手のアイコン、名前、最新のメッセージ (自分も相手も含む) を返すapi
  @Get()
  @UseGuards(AuthGuard)
  async findRoomList(
    @FirebaseAuth() authUser: any,
  ): Promise<ChatRoomWithInterlocutorAndMessageEntity[]> {
    return await this.findManyChatRoomsWithInterlocutorAndMessage.handle(
      authUser.uid,
    );
  }
}
