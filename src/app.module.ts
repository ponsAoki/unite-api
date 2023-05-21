import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './common/auth/auth.middleware';
import { AuthModule } from './common/auth/auth.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';
import { CorporationController } from './corporation/corporation.controller';
import { CorporationService } from './corporation/corporation.service';
import { PrismaService } from './prisma.service';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [UserModule, UserRecruitModule, AuthModule, EmployeeModule],
  controllers: [CorporationController],
  providers: [CorporationService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user', method: RequestMethod.POST },
        { path: 'user-recruit', method: RequestMethod.GET },
        { path: 'user-recruit/:id', method: RequestMethod.GET},
        { path: 'corporation', method: RequestMethod.POST },
        { path: 'corporation', method: RequestMethod.GET },
        { path: 'corporation/sharedPassword', method: RequestMethod.GET },
        { path: 'corporation/:id', method: RequestMethod.PUT },
        { path: 'corporation/:id', method: RequestMethod.DELETE },
        { path: 'employee', method: RequestMethod.POST},
        { path: 'employee', method: RequestMethod.GET},
      ) //認証情報が渡され得ないリクエストのみmiddlewareを噛ませない
      .forRoutes('*');
  }
}
