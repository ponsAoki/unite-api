import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserRecruitInput } from './dto/create-user-recruit.input';
import { UpdateUserRecruitInput } from './dto/update-user-recruit.input';
import { UserRecruitEntity } from './entities/user-recruit.entity';
import { CreateUserRecruit } from './use-case/create-user-recruit';
import { DeleteUserRecruit } from './use-case/delete-user-recruit';
import { UpdateUserRecruit } from './use-case/update-user-recruit';
import { UserRecruitService } from './user-recruit.service';
import { UserService } from 'src/user/user.service';

@Controller('user-recruit')
export class UserRecruitController {
  constructor(
    private readonly userRecruitService: UserRecruitService,
    private readonly createUserRecruit: CreateUserRecruit,
    private readonly updateUserRecruitService: UpdateUserRecruit,
    private readonly deleteUserRecruitService: DeleteUserRecruit,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<UserRecruitEntity[]> {
    return await this.userRecruitService.findAll();
  }

  @Get('my-recruits')
  async findMyRecruits(
    @FirebaseAuth() authUser: any
  ) {
    const user = await this.userService.findByFirebaseUID(authUser.uid)
    console.log(user)
    return this.userRecruitService.findManyByUserId(user.id)
  }

  @Get('related-recruits')
  async findRelativeManybyUserId(
    @FirebaseAuth() authUser: any
  ) {
    const user = await this.userService.findByFirebaseUID(authUser.uid)
    return this.userRecruitService.findRelativeManybyUserId(user.id)

  }

  @Post()
  async create(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserRecruitInput,
  ): Promise<UserRecruitEntity> {
    return await this.createUserRecruit.handle(authUser.uid, input);
  }

  @Get('findOne/:id')
  async findById(
    @Param('id') id: string,
    @FirebaseAuth() authUser: any
  ): Promise<UserRecruitEntity> {
    return await this.userRecruitService.findById(id);
  }

  @Put(':id')
  async update(
    @FirebaseAuth() authUser: any,
    @Param('id') id: string,
    @Body() input: UpdateUserRecruitInput,
  ): Promise<UserRecruitEntity> {
    return await this.updateUserRecruitService.handle(id, authUser.uid, input);
  }

  @Delete(':id')
  async delete(
    @FirebaseAuth() authUser: any,
    @Param('id') id: string,
  ): Promise<UserRecruitEntity> {
    return await this.deleteUserRecruitService.handle(id, authUser.uid);
  }
}
