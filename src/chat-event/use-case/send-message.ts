import { Injectable } from '@nestjs/common';
import { ChatRoomMessageService } from 'src/chat-room-message/chat-room-message.service';
import { ChatMessageInput } from '../dto/chat-message.input';
import { Server } from 'socket.io';
import { ChatSenderInput } from '../dto/chat-sender.input';

@Injectable()
export class SendMessage {
  constructor(
    private readonly chatRoomMessageService: ChatRoomMessageService,
  ) {}

  async handle(
    server: Server,
    sender: ChatSenderInput,
    input: ChatMessageInput,
  ): Promise<void> {
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
  }
}
