import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserToRecruitLikeInput } from './dto/create-user-to-recruit-like';
import { UserToRecruitLikeService } from './user-to-recruit-like.service';
import { UserToRecruitLike } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DeleteUserToRecruitLikeService } from './use-case/delete-user-to-recruit-like';
import { UserService } from 'src/user/user.service';

@Controller('user-to-recruit-like')
export class UserToRecruitLikeController {
  constructor(
    private readonly userToRecruitLikeService: UserToRecruitLikeService,
    private readonly deleteUserToRecruitLikeService: DeleteUserToRecruitLikeService,
    private readonly userService: UserService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createLike(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserToRecruitLikeInput
  ): Promise<UserToRecruitLike> {
    const user = await this.userService.findByFirebaseUID(authUser.uid)
    return await this.userToRecruitLikeService.create(user.id, input.recruitId)
  }

  @Delete(':recruitId')
  @UseGuards(AuthGuard)
  async deleteLile(
    @FirebaseAuth() authUser: any,
    @Param('recruitId') recruitId: string
  ): Promise<void> {
    return this.deleteUserToRecruitLikeService.handle(authUser.uid, recruitId)
  }
}