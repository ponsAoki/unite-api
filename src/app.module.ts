import { Module } from '@nestjs/common';
import { AuthModule } from './common/auth/auth.module';
import { RecruitModule } from './recruit/recruit.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, RecruitModule, UserRecruitModule, AuthModule],
})
export class AppModule {}
