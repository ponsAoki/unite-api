import { Injectable } from '@nestjs/common';
import { ChatRoomParticipantEntity } from '../entities/chat-room-participant.entity';
import { ChatRoomParticipantService } from '../chat-room-participant.service';
import { ChatAuthParam } from 'src/common/decorators/chat-atuh.decorator';

@Injectable()
export class FindChatRoomParticipantByRoomIdAndUserId {
  constructor(
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
  ) {}

  async handle(
    operator: ChatAuthParam,
    roomId: string,
  ): Promise<ChatRoomParticipantEntity> {
    const participant =
      await this.chatRoomParticipantService.findByRoomIdAndUserIdOrEmployeeId({
        roomId,
        userId: operator.user?.id,
        employeeId: operator.employee?.id,
      });

    return participant;
  }
}
