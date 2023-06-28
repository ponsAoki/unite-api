import { Module } from '@nestjs/common';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { AuthModule } from './common/auth/auth.module';
import { UserRecruitApplicationModule } from './user-recruit-application/user-recruit-application.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';
import { CorporationController } from './corporation/corporation.controller';
import { CorporationService } from './corporation/corporation.service';
import { PrismaService } from './prisma.service';
import { EmployeeModule } from './employee/employee.module';

import { ChatEventModule } from './chat-event/chat-event.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { UserRecruitParticipantModule } from './user-recruit-participant/user-recruit-participant.module';


@Module({
  imports: [
    UserModule,
    UserRecruitModule,
    AuthModule,
    EmployeeModule,
    UserRecruitApplicationModule,
    ChatEventModule,
    ChatRoomModule,
    ProductModule,
    CommentModule,
    UserRecruitParticipantModule
  ],
  controllers: [CorporationController],
  providers: [CorporationService, PrismaService],
})
export class AppModule {}
