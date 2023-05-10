import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRecruitInput } from './dto/create-recruit.input';
import { UpdateRecruitInput } from './dto/update-recruite.input';
import { RecruitEntity } from './entities/recruit.entity';
import { RecruitService } from './recruit.service';
import { CreateUserRecruit } from './use-case/create-user-recruit';
import { DeleteUserRecruit } from './use-case/delete-user-recruit';
import { UpdateUserRecruit } from './use-case/update-user-recruit';

@Controller('recruit')
export class RecruitController {
  constructor(
    private readonly recruitService: RecruitService,
    private readonly createUserRecruitService: CreateUserRecruit,
    private readonly updateUserRecruitService: UpdateUserRecruit,
    private readonly deleteUserRecruitService: DeleteUserRecruit,
  ) {}

  @Get()
  async findAll(): Promise<RecruitEntity[]> {
    return await this.recruitService.findAll();
  }

  @Post('create-user-recruit')
  async createUserRecruit(
    @Headers('recruiter-id') recruiterId: string,
    @Body() input: CreateRecruitInput,
  ): Promise<RecruitEntity> {
    return await this.createUserRecruitService.handle(recruiterId, input);
  }

  @Put('update-user-recruit')
  async updateUserRecruit(
    @Headers('recruit-id') recruitId: string,
    @Headers('recruiter-id') recruiterId: string,
    @Body() input: UpdateRecruitInput,
  ): Promise<RecruitEntity> {
    return await this.updateUserRecruitService.handle(
      recruitId,
      recruiterId,
      input,
    );
  }

  @Delete('delete-user-recruit')
  async deleteUserRecruit(
    @Headers('recruit-id') recruitId: string,
    @Headers('recruiter-id') recruiterId: string,
  ): Promise<RecruitEntity> {
    return await this.deleteUserRecruitService.handle(recruitId, recruiterId);
  }
}
