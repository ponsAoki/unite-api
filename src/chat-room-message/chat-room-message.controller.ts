import { Controller, Get, Param } from '@nestjs/common';
import { ChatRoomMessageEntity } from './entities/chat-room-message.entity';
import { FindManyMessagesWithSenderInformation } from './use-case/find-many-message-with-sender-information';

@Controller('chat-room-message')
export class ChatRoomMessageController {
  constructor(
    private readonly findManyMessagesWithSenderInformation: FindManyMessagesWithSenderInformation,
  ) {}

  @Get(':roomId')
  async findManyByRoomId(
    @Param('roomId') roomId: string,
  ): Promise<ChatRoomMessageEntity[]> {
    return await this.findManyMessagesWithSenderInformation.handle(roomId);
  }
}
