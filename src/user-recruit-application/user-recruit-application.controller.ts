import { Body, Controller, Get, Post } from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserRecruitApplicationInput } from './dto/create-user-recruit-application.input';
import { UserRecruitApplicationEntity } from './entities/user-recruit-application.entity';
import { ApplyForUserRecruit } from './use-case/apply-for-user-recruit';
import { UserRecruitApplicationService } from './user-recruit-application.service';
import { UserRecruitApplicationWithRoomIdEntity } from './entities/user-recruit-application-with-room-id.entitiy';

@Controller('user-recruit-application')
export class UserRecruitApplicationController {
  constructor(
    private readonly applyForUserRecruit: ApplyForUserRecruit,
    private readonly userRecruitApplicationService: UserRecruitApplicationService,
  ) {}

  @Get()
  async findAll(): Promise<UserRecruitApplicationEntity[]> {
    return await this.userRecruitApplicationService.findAll();
  }

  @Post()
  async create(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserRecruitApplicationInput,
  ): Promise<UserRecruitApplicationWithRoomIdEntity> {
    return await this.applyForUserRecruit.handle(authUser.uid, input);
  }
}
