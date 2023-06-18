import { Module } from '@nestjs/common';
import { ChatEventGateway } from './chat-event.gateway';
import { SendMessage } from './use-case/send-message';
import { ChatRoomMessageModule } from 'src/chat-room-message/chat-room-message.module';
import { UserModule } from 'src/user/user.module';
import { AuthCheckPolicy } from './policy/auth-check.policy';
import { ChatRoomParticipantModule } from 'src/chat-room-participant/chat-room-participant.module';

@Module({
  imports: [ChatRoomMessageModule, UserModule, ChatRoomParticipantModule],
  providers: [ChatEventGateway, SendMessage, AuthCheckPolicy],
})
export class ChatEventModule {}
