import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomController } from './chat-room.controller';
import { FindManyChatRoomsWithInterlocutorAndMessage } from './use-case/find-chat-room-with-interlocutor-and-message';
import { UserModule } from 'src/user/user.module';
import { ChatRoomParticipantModule } from 'src/chat-room-participant/chat-room-participant.module';
import { ChatRoomMessageModule } from 'src/chat-room-message/chat-room-message.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { CorporationModule } from 'src/corporation/corporation.module';

@Module({
  imports: [
    UserModule,
    EmployeeModule,
    ChatRoomParticipantModule,
    ChatRoomMessageModule,
    CorporationModule,
  ],
  providers: [
    ChatRoomService,
    PrismaService,
    FindManyChatRoomsWithInterlocutorAndMessage,
  ],
  controllers: [ChatRoomController],
})
export class ChatRoomModule {}
