import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomMessageService } from './chat-room-message.service';
import { ChatRoomMessageController } from './chat-room-message.controller';
import { FindManyMessagesWithSenderInformation } from './use-case/find-many-message-with-sender-information';
import { ChatRoomParticipantModule } from 'src/chat-room-participant/chat-room-participant.module';
import { UserModule } from 'src/user/user.module';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [ChatRoomParticipantModule, UserModule, EmployeeModule],
  providers: [
    ChatRoomMessageService,
    PrismaService,
    FindManyMessagesWithSenderInformation,
  ],
  controllers: [ChatRoomMessageController],
  exports: [ChatRoomMessageService],
})
export class ChatRoomMessageModule {}
