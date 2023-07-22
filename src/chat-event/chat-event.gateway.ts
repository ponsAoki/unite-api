import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatMessageInput } from './dto/chat-message.input';
import { SendMessage } from './use-case/send-message';
import { UseGuards } from '@nestjs/common';
import { ChatSenderGuard } from './guards/chat-sender.guard';
import { ChatSender } from 'src/chat-event/decorators/chat-sender.decorator';
import { ChatSenderInput } from './dto/chat-sender.input';

@WebSocketGateway({
  cors: { origin: [process.env.UNITE_API_URL, process.env.UNITE_FRONT_URL] },
})
export class ChatEventGateway {
  constructor(private readonly sendMessage: SendMessage) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('toServer')
  @UseGuards(ChatSenderGuard)
  async handleMessage(
    @ChatSender() sender: ChatSenderInput,
    @MessageBody() input: ChatMessageInput,
  ): Promise<void> {
    await this.sendMessage.handle(this.server, sender, input);
  }
}
