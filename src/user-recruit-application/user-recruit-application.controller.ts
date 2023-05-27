import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserRecruitApplicationInput } from './dto/create-user-recruit-application.input';
import { UserRecruitApplicationEntity } from './entities/user-recruit-application.entity';
import { ApplyForUserRecruit } from './use-case/apply-for-user-recruit';

@Controller('user-recruit-application')
export class UserRecruitApplicationController {
  constructor(private readonly applyForUserRecruit: ApplyForUserRecruit) {}

  @Post()
  async create(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserRecruitApplicationInput,
  ): Promise<UserRecruitApplicationEntity> {
    return await this.applyForUserRecruit.handle(authUser.uid, input);
  }
}
