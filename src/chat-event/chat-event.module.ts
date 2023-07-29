import { Module } from '@nestjs/common';
import { ChatEventGateway } from './gateways/chat-event.gateway';
import { SendMessageService } from './use-case/send-message.service';
import { ChatRoomMessageModule } from 'src/chat-room-message/chat-room-message.module';
import { UserModule } from 'src/user/user.module';
import { ChatRoomParticipantModule } from 'src/chat-room-participant/chat-room-participant.module';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    ChatRoomMessageModule,
    UserModule,
    ChatRoomParticipantModule,
    EmployeeModule,
  ],
  providers: [ChatEventGateway, SendMessageService],
  exports: [SendMessageService],
})
export class ChatEventModule {}
