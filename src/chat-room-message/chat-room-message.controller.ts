import { Controller, Get, Param } from '@nestjs/common';
import { ChatRoomMessageEntity } from './entities/chat-room-message.entity';
import { ChatRoomMessageService } from './chat-room-message.service';

@Controller('chat-room-message')
export class ChatRoomMessageController {
  constructor(
    private readonly chatRoomMessageService: ChatRoomMessageService,
  ) {}

  @Get(':roomId')
  async findManyByRoomId(
    @Param('roomId') roomId: string,
  ): Promise<ChatRoomMessageEntity[]> {
    return await this.chatRoomMessageService.findManyByRoomId(roomId);
  }
}
