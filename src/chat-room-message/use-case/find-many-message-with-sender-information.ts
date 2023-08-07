import { UserService } from 'src/user/user.service';
import { ChatRoomMessageService } from '../chat-room-message.service';
import { ChatRoomMessageEntity } from '../entities/chat-room-message.entity';
import { ChatRoomParticipantService } from 'src/chat-room-participant/chat-room-participant.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindManyMessagesWithSenderInformation {
  constructor(
    private readonly chatRoomMessageService: ChatRoomMessageService,
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
    private readonly userService: UserService,
  ) {}

  async handle(roomId: string): Promise<ChatRoomMessageEntity[]> {
    const messages = await this.chatRoomMessageService.findManyByRoomId(roomId);

    return await Promise.all(
      messages
        .map(async (message: ChatRoomMessageEntity) => {
          const senderParticipant = await this.chatRoomParticipantService.find(
            message.senderId,
          );
          if (!senderParticipant) return;

          const senderUser = await this.userService.find(
            senderParticipant.userId,
          );
          if (!senderUser) return;

          return {
            ...message,
            senderImage: senderUser.imageUrl,
            senderName: senderUser.name,
          };
        })
        .filter(async (messageInfo) => !!(await messageInfo)),
    );
  }
}
