import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './common/auth/auth.middleware';
import { AuthModule } from './common/auth/auth.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, UserRecruitModule, AuthModule],
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
