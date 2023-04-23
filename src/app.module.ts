import { Module } from '@nestjs/common';
import { RecruitModule } from './recruit/recruit.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, RecruitModule, UserRecruitModule],
})
export class AppModule {}
