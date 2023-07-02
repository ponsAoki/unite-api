import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserRecruitApplicationInput } from './dto/create-user-recruit-application.input';
import { UserRecruitApplicationEntity } from './entities/user-recruit-application.entity';
import { ApplyForUserRecruit } from './use-case/apply-for-user-recruit';
import { UserRecruitApplicationService } from './user-recruit-application.service';
import { UserRecruitApplicationWithRoomIdEntity } from './entities/user-recruit-application-with-room-id.entitiy';
import { AuthGuard } from 'src/common/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  async create(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserRecruitApplicationInput,
  ): Promise<UserRecruitApplicationWithRoomIdEntity> {
    return await this.applyForUserRecruit.handle(authUser.uid, input);
  }
}
