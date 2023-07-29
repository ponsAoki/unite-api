import { Injectable } from '@nestjs/common';
import { ChatMessageInput } from 'src/chat-event/dto/chat-message.input';
import { Server } from 'socket.io';
import { ChatSenderInput } from 'src/chat-event/dto/chat-sender.input';
import { ChatRoomMessageService } from '../../chat-room-message/chat-room-message.service';
import { ChatRoomMessageEntity } from 'src/chat-room-message/entities/chat-room-message.entity';

@Injectable()
export class SendMessageService {
  constructor(
    private readonly chatRoomMessageService: ChatRoomMessageService,
  ) {}

  async handle(
    server: Server,
    sender: ChatSenderInput,
    input: ChatMessageInput,
  ): Promise<ChatRoomMessageEntity> {
    const message = await this.chatRoomMessageService.create({
      content: input.message,
      roomId: input.roomId,
      senderId: sender.participant.id,
    });

    const resMessage = {
      ...message,
      senderName: sender.user.name,
      senderImage: sender.user.imageUrl,
    };

    server.emit('toClient', resMessage);

    return resMessage;
  }
}
