import { Injectable } from '@nestjs/common';
import { ChatRoomMessageService } from 'src/chat-room-message/chat-room-message.service';
import { UserService } from 'src/user/user.service';
import { ChatMessageInput } from '../dto/chat-message.input';
import { Server, Socket } from 'socket.io';
import { AuthCheckPolicy } from '../policy/auth-check.policy';
import { ChatRoomMessageEntity } from 'src/chat-room-message/entities/chat-room-message.entity';
import { ChatRoomParticipantService } from 'src/chat-room-participant/chat-room-participant.service';

@Injectable()
export class SendMessage {
  constructor(
    private readonly chatRoomMessageService: ChatRoomMessageService,
    private readonly userService: UserService,
    private readonly authCheckPolicy: AuthCheckPolicy,
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
  ) {}

  async handle(
    server: Server,
    input: ChatMessageInput,
    client: Socket,
  ): Promise<void> {
    const authInfo = await this.authCheckPolicy.handle(
      client.handshake.headers,
    );
    const senderUser = await this.userService.findByFirebaseUID(authInfo.uid);
    if (!senderUser) throw new Error('sender user not found');

    const senderParticipant =
      await this.chatRoomParticipantService.findByRoomIdAndUserId({
        roomId: input.roomId,
        userId: senderUser.id,
      });
    if (!senderParticipant) throw new Error('sender participant not found');

    const message = await this.chatRoomMessageService.create({
      content: input.message,
      roomId: input.roomId,
      senderId: senderParticipant.id,
    });

    const resMessage = {
      ...message,
      senderName: senderUser.name,
      senderImage: senderUser.imageUrl,
    };

    server.emit('toClient', resMessage);
  }
}
