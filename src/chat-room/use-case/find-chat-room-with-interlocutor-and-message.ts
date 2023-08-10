import { Injectable } from '@nestjs/common';
import { ChatRoomWithInterlocutorAndMessageEntity } from '../entities/chat-room-with-interlocutor-and-message-entity';
import { UserService } from 'src/user/user.service';
import { ChatRoomParticipantService } from 'src/chat-room-participant/chat-room-participant.service';
import { ChatRoomService } from '../chat-room.service';
import { ChatRoomMessageService } from 'src/chat-room-message/chat-room-message.service';
import { ChatSenderInput } from 'src/chat-event/dto/chat-sender.input';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee, User } from '@prisma/client';
import { UserAuthParam } from 'src/common/decorators/auth.decorator';
import { CompanyAuthParam } from 'src/common/decorators/company-auth.decorator';
import { ChatAuthParam } from 'src/common/decorators/chat-atuh.decorator';

@Injectable()
export class FindManyChatRoomsWithInterlocutorAndMessage {
  constructor(
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
    private readonly chatRoomService: ChatRoomService,
    private readonly userService: UserService,
    private readonly employeeService: EmployeeService,
    private readonly chatRoomMessageService: ChatRoomMessageService,
  ) {}

  async handle(
    operator: ChatAuthParam,
  ): Promise<ChatRoomWithInterlocutorAndMessageEntity[]> {
    const ownParticipants =
      await this.chatRoomParticipantService.findManyByUserIdOrEmployeeId({
        userId: operator.user?.id,
        employeeId: operator.employee?.id,
      });

    return await Promise.all(
      ownParticipants
        .map(async (participant) => {
          const room = await this.chatRoomService.find(participant.roomId);
          if (!room) return;

          const interlocutor =
            await this.chatRoomParticipantService.findInterlocutor(room.id, {
              userId: participant.userId,
              employeeId: participant.employeeId,
            });
          if (!interlocutor) return;

          let interlocutorInfo: User | Employee;
          switch (true) {
            case !!interlocutor.userId:
              interlocutorInfo = await this.userService.find(
                interlocutor.userId,
              );
              break;
            case !!interlocutor.employeeId:
              interlocutorInfo = await this.employeeService.find(
                interlocutor.employeeId,
              );
              break;
            default:
              return;
          }

          const messages = await this.chatRoomMessageService.findManyByRoomId(
            room.id,
          );
          const latestMessage = messages[messages.length - 1];

          const lastDate = latestMessage.createdAt;

          return {
            ...room,
            interlocutorName: interlocutorInfo.name,
            interlocutorImageUrl: interlocutorInfo.imageUrl,
            latestMessage: latestMessage.content,
            lastDate,
          };
        })
        .filter(async (roomInfo) => !!(await roomInfo)),
    );
  }
}
