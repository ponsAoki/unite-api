import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ChatRoomParticipantEntity } from '../entities/chat-room-participant.entity';
import { ChatRoomParticipantService } from '../chat-room-participant.service';

@Injectable()
export class FindChatRoomParticipantByRoomId {
  constructor(
    private readonly userService: UserService,
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
  ) {}

  async handle(
    firebaseUid: string,
    roomId: string,
  ): Promise<ChatRoomParticipantEntity> {
    const user = await this.userService.findByFirebaseUID(firebaseUid);

    const participant =
      await this.chatRoomParticipantService.findByRoomIdAndUserId({
        roomId,
        userId: user.id,
      });

    return participant;
  }
}
