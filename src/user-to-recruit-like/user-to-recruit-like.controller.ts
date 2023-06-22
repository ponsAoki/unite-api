import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserToRecruitLikeInput } from './dto/create-user-to-recruit-like';
import { UserService } from 'src/user/user.service';
import { UserToRecruitLikeService } from './user-to-recruit-like.service';
import { UserTORecruitLike } from '@prisma/client';

@Controller('user-to-recruit-like')
export class UserToRecruitLikeController {
  constructor(
    private readonly userService: UserService,
    private readonly userToRecruitLikeService: UserToRecruitLikeService,
  ) {}

  @Post()
  async createLike(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserToRecruitLikeInput
  ): Promise<UserTORecruitLike> {
    const user = await this.userService.findByFirebaseUID(authUser.uid)
    return await this.userToRecruitLikeService.create(user.id, input.recruitId)
  }

  @Delete(':id')
  async deleteLile(
    @FirebaseAuth() authUser: any,
    @Param('id') id: string
  ): Promise<UserTORecruitLike> {
    return this.userToRecruitLikeService.delete(id)
  }
}