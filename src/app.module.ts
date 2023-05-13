import { Module } from '@nestjs/common';
import { AuthModule } from './common/auth/auth.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, UserRecruitModule, AuthModule],
})
export class AppModule {}
