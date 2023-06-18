import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageInput } from './dto/chat-message.input';
import { SendMessage } from './use-case/send-message';

@WebSocketGateway({
  cors: { origin: [process.env.UNITE_API_URL, process.env.UNITE_FRONT_URL] },
})
export class ChatEventGateway {
  constructor(private readonly sendMessage: SendMessage) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('toServer')
  async handleMessage(
    @MessageBody() input: ChatMessageInput,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await this.sendMessage.handle(this.server, input, client);
  }
}
