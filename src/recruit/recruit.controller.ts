import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { Recruit } from '@prisma/client';
import { CreateRecruitInput } from './dto/create-recruit.input';
import { RecruitEntity } from './entities/recruit.entity';
import { RecruitService } from './recruit.service';
import { CreateUserRecruit } from './use-case/create-user-recruit';

@Controller('recruit')
export class RecruitController {
  constructor(
    private readonly recruitService: RecruitService,
    private readonly createUserRecruitService: CreateUserRecruit,
  ) {}

  @Get()
  async findAll(): Promise<RecruitEntity[]> {
    return await this.recruitService.findAll();
  }

  @Post('create-user-recruit')
  async createUserRecruit(
    @Headers() headers: any,
    @Body() input: CreateRecruitInput,
  ): Promise<Recruit> {
    return await this.createUserRecruitService.handle(
      headers['recruiter-id'],
      input,
    );
  }
}
