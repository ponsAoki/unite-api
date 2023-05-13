import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserRecruitInput } from './dto/create-user-recruit.input';
import { UpdateUserRecruitInput } from './dto/update-user-recruit.input';
import { UserRecruitEntity } from './entities/user-recruit.entity';
import { CreateUserRecruit } from './use-case/create-user-recruit';
import { DeleteUserRecruit } from './use-case/delete-user-recruit';
import { UpdateUserRecruit } from './use-case/update-user-recruit';
import { UserRecruitService } from './user-recruit.service';

@Controller('user-recruit')
export class UserRecruitController {
  constructor(
    private readonly userRecruitService: UserRecruitService,
    private readonly createUserRecruit: CreateUserRecruit,
    private readonly updateUserRecruitService: UpdateUserRecruit,
    private readonly deleteUserRecruitService: DeleteUserRecruit,
  ) {}

  @Get()
  async findAll(): Promise<UserRecruitEntity[]> {
    return await this.userRecruitService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserRecruitEntity> {
    return await this.userRecruitService.findById(id);
  }

  @Post()
  async create(
    @Headers('recruiter-firebase-uid') recruiterFirebaseUID: string,
    @Body() input: CreateUserRecruitInput,
  ): Promise<UserRecruitEntity> {
    return await this.createUserRecruit.handle(recruiterFirebaseUID, input);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Headers('recruiter-firebase-uid') recruiterFirebaseUID: string,
    @Body() input: UpdateUserRecruitInput,
  ): Promise<UserRecruitEntity> {
    return await this.updateUserRecruitService.handle(
      id,
      recruiterFirebaseUID,
      input,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('recruiter-firebase-uid') recruiterFirebaseUID: string,
  ): Promise<UserRecruitEntity> {
    return await this.deleteUserRecruitService.handle(id, recruiterFirebaseUID);
  }
}
