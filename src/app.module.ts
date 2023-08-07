import { Module } from '@nestjs/common';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { AuthModule } from './common/auth/user/auth.module';
import { UserRecruitApplicationModule } from './user-recruit-application/user-recruit-application.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';
import { CorporationController } from './corporation/corporation.controller';
import { CorporationService } from './corporation/corporation.service';
import { PrismaService } from './prisma.service';
import { EmployeeModule } from './employee/employee.module';

import { ChatEventModule } from './chat-event/chat-event.module';
import { UserToRecruitLikeModule } from './user-to-recruit-like/user-to-recruit-like.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { UserRecruitParticipantModule } from './user-recruit-participant/user-recruit-participant.module';
import { EmployeeToProductLikeModule } from './employee-to-product-like/employee-to-product-like.module';
import { CorporateAuthModule } from './common/auth/employee/corporate-auth.module';
import { ScoutModule } from './scout/scout.module';
import { CorporationModule } from './corporation/corporation.module';
import { PeriodLikeSumModule } from './period-like-sum/period-like-sum.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    UserRecruitModule,
    AuthModule,
    EmployeeModule,
    UserRecruitApplicationModule,
    ChatEventModule,
    ChatRoomModule,
    UserToRecruitLikeModule,
    ProductModule,
    CommentModule,
    UserRecruitParticipantModule,
    CorporateAuthModule,
    ScoutModule,
    CorporationModule,
    EmployeeToProductLikeModule,
    PeriodLikeSumModule,
  ],
  controllers: [CorporationController],
  providers: [CorporationService, PrismaService],
})
export class AppModule {}
