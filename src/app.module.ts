import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './common/auth/auth.middleware';
import { AuthModule } from './common/auth/auth.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';
import { CorporationController } from './corporation/corporation.controller';
import { CorporationService } from './corporation/corporation.service';
import { PrismaService } from './prisma.service';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { UserRecruitParticipantModule } from './user-recruit-participant/user-recruit-participant.module';

@Module({
  imports: [UserModule, UserRecruitModule, AuthModule, EmployeeModule, ProductModule, CommentModule, UserRecruitParticipantModule],
  controllers: [CorporationController],
  providers: [CorporationService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user', method: RequestMethod.POST },
        { path: 'user', method: RequestMethod.GET },
        // { path: 'user/:id', method: RequestMethod.GET },
        { path: 'user-recruit', method: RequestMethod.GET },
        { path: 'user-recruit/findOne/:id', method: RequestMethod.GET },
        { path: 'corporation', method: RequestMethod.POST },
        { path: 'corporation', method: RequestMethod.GET },
        { path: 'corporation/sharedPassword', method: RequestMethod.GET },
        { path: 'corporation/:id', method: RequestMethod.PUT },
        { path: 'corporation/:id', method: RequestMethod.DELETE },
        { path: 'employee', method: RequestMethod.POST},
        { path: 'employee', method: RequestMethod.GET},
        { path: 'product/upload', method: RequestMethod.POST},
        { path: 'product', method: RequestMethod.GET},
        { path: 'product/findone/:id', method: RequestMethod.GET},
        { path: 'user-recruit-participant', method: RequestMethod.GET},
        { path: 'user-recruit-participant/find-many-by-userRecruit', method: RequestMethod.POST},
        { path: 'user-recruit-participant/:id/approve', method: RequestMethod.PUT},
      ) //認証情報が渡され得ないリクエストのみmiddlewareを噛ませない
      .forRoutes('*');
  }
}
