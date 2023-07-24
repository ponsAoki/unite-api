import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatMessageInput } from '../dto/chat-message.input';
import { SendMessageService } from '../use-case/send-message.service';
import { UseGuards } from '@nestjs/common';
import { ChatSenderGuard } from '../guards/chat-sender.guard';
import { ChatSender } from 'src/chat-event/decorators/chat-sender.decorator';
import { ChatSenderInput } from '../dto/chat-sender.input';
import { ChatRoomMessageEntity } from 'src/chat-room-message/entities/chat-room-message.entity';

@WebSocketGateway({
  cors: { origin: [process.env.UNITE_API_URL, process.env.UNITE_FRONT_URL] },
})
export class ChatEventGateway {
  constructor(private readonly sendMessageService: SendMessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('toServer')
  @UseGuards(ChatSenderGuard)
  async handleMessage(
    @ChatSender() sender: ChatSenderInput,
    @MessageBody() input: ChatMessageInput,
  ): Promise<ChatRoomMessageEntity> {
    return await this.sendMessageService.handle(this.server, sender, input);
  }
}
