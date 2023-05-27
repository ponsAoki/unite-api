import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ChatRoomMessageModule } from './chat-room-message/chat-room-message.module';
import { ChatRoomParticipantModule } from './chat-room-participant/chat-room-participant.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { AuthMiddleware } from './common/auth/auth.middleware';
import { AuthModule } from './common/auth/auth.module';
import { UserRecruitApplicationModule } from './user-recruit-application/user-recruit-application.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    UserRecruitModule,
    AuthModule,
    UserRecruitApplicationModule,
    ChatRoomModule,
    ChatRoomParticipantModule,
    ChatRoomMessageModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user', method: RequestMethod.POST },
        { path: 'user-recruit', method: RequestMethod.GET },
      ) //認証情報が渡され得ないリクエストのみmiddlewareを噛ませない
      .forRoutes('*');
  }
}
