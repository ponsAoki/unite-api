import { Injectable } from '@nestjs/common';
import { ChatRoomWithInterlocutorAndMessageEntity } from '../entities/chat-room-with-interlocutor-and-message-entity';
import { UserService } from 'src/user/user.service';
import { ChatRoomParticipantService } from 'src/chat-room-participant/chat-room-participant.service';
import { ChatRoomService } from '../chat-room.service';
import { ChatRoomMessageService } from 'src/chat-room-message/chat-room-message.service';

@Injectable()
export class FindManyChatRoomsWithInterlocutorAndMessage {
  constructor(
    private readonly userService: UserService,
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
    private readonly chatRoomService: ChatRoomService,
    private readonly chatRoomMessageService: ChatRoomMessageService,
  ) {}

  async handle(
    firebaseUid: string,
  ): Promise<ChatRoomWithInterlocutorAndMessageEntity[]> {
    const operatorUser = await this.userService.findByFirebaseUID(firebaseUid);
    if (!operatorUser) throw new Error('operator user not found');

    const ownParticipants =
      await this.chatRoomParticipantService.findManyByUserId(operatorUser.id);

    return await Promise.all(
      ownParticipants.map(async (participant) => {
        const room = await this.chatRoomService.find(participant.roomId);
        if (!room) throw new Error('chat room not found');

        const interlocutor =
          await this.chatRoomParticipantService.findInterlocutor(
            room.id,
            operatorUser.id,
          );
        if (!interlocutor) {
          throw new Error('interlocutor participant not found');
        }

        const interlocutorUser = await this.userService.find(
          interlocutor.userId,
        );
        if (!interlocutorUser) throw new Error('interlocutor user not found');

        const messages = await this.chatRoomMessageService.findManyByRoomId(
          room.id,
        );
        const latestMessage = messages[messages.length - 1];

        const lastDate = latestMessage.createdAt;

        return {
          ...room,
          interlocutorName: interlocutorUser.name,
          interlocutorImageUrl: interlocutorUser.imageUrl,
          latestMessage: latestMessage.content,
          lastDate,
        };
      }),
    );
  }
}
