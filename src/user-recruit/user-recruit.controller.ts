import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserRecruitInput } from './dto/create-user-recruit.input';
import { UpdateUserRecruitInput } from './dto/update-user-recruit.input';
import { UserRecruitEntity } from './entities/user-recruit.entity';
import { CreateUserRecruit } from './use-case/create-user-recruit';
import { DeleteUserRecruit } from './use-case/delete-user-recruit';
import { UpdateUserRecruit } from './use-case/update-user-recruit';
import { UserRecruitService } from './user-recruit.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
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

  // @Get()
  // async findAll(): Promise<UserRecruitEntity[]> {
  //   return await this.userRecruitService.findAll();
  // }
  @Get()
  async findAll(@Query('search') search: string | undefined): Promise<any> {
    return await this.userRecruitService.findSearch(search);
  }

  @Get('my-recruits')
  @UseGuards(AuthGuard)
  async findMyRecruits(@FirebaseAuth() authUser: any) {
    const recruiter = await this.userService.findByFirebaseUID(authUser.uid);
    return this.userRecruitService.findManyByUserId(recruiter.id);
  }

  @Get('owned-recruits-by-id/:userId')
  async findOwnedRecruits(@Param('userId') userId: string) {
    return this.userRecruitService.findManyByUserId(userId);
  }

  @Get('related-recruits')
  @UseGuards(AuthGuard)
  async findRelativeManybyUserId(@FirebaseAuth() authUser: any) {
    const user = await this.userService.findByFirebaseUID(authUser.uid);
    return this.userRecruitService.findRelativeManybyUserId(user.id);
  }

  @Get('liked-recruits')
  @UseGuards(AuthGuard)
  async findLikedRecruits(@FirebaseAuth() authUser: any) {
    const user = await this.userService.findByFirebaseUID(authUser.uid);
    return this.userRecruitService.findLikedRecruitsByUserId(user.id);
  }

  async findMyRelativeMany(@FirebaseAuth() authUser: any) {
    const user = await this.userService.findByFirebaseUID(authUser.uid);
    return this.userRecruitService.findRelativeManybyUserId(user.id);
  }

  @Get('related-recruits-by-id/:userId')
  async findRelativeManyByUserId(@Param('userId') userId: string) {
    return this.userRecruitService.findRelativeManybyUserId(userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserRecruitInput,
  ): Promise<UserRecruitEntity> {
    return await this.createUserRecruit.handle(authUser.uid, input);
  }

  @Get('findOne/:id')
  // @UseGuards(AuthGuard)
  async findById(
    @Param('id') id: string,
    // @FirebaseAuth() authUser: any,
  ): Promise<UserRecruitEntity> {
    return await this.userRecruitService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @FirebaseAuth() authUser: any,
    @Param('id') id: string,
    @Body() input: UpdateUserRecruitInput,
  ): Promise<UserRecruitEntity> {
    return await this.updateUserRecruitService.handle(id, authUser.uid, input);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(
    @FirebaseAuth() authUser: any,
    @Param('id') id: string,
  ): Promise<UserRecruitEntity> {
    return await this.deleteUserRecruitService.handle(id, authUser.uid);
  }
}
