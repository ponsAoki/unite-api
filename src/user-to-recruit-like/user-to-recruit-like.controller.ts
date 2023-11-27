import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserToRecruitLikeInput } from './dto/create-user-to-recruit-like';
import { UserToRecruitLikeService } from './user-to-recruit-like.service';
import { UserToRecruitLike } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DeleteUserToRecruitLikeService } from './use-case/delete-user-to-recruit-like';
import { UserService } from 'src/user/user.service';
import { CreateUserToRecruitLike } from './use-case/create-user-to-recruit-like';

@Controller('user-to-recruit-like')
export class UserToRecruitLikeController {
  constructor(
    private readonly userToRecruitLikeService: UserToRecruitLikeService,
    private readonly createUserToRecruitLike: CreateUserToRecruitLike,
    private readonly deleteUserToRecruitLike: DeleteUserToRecruitLikeService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createLike(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserToRecruitLikeInput,
  ): Promise<void> {
    return await this.createUserToRecruitLike.handle(
      authUser.uid,
      input.recruitId,
    );
  }

  @Delete(':recruitId')
  @UseGuards(AuthGuard)
  async deleteLike(
    @FirebaseAuth() authUser: any,
    @Param('recruitId') recruitId: string,
  ): Promise<void> {
    return await this.deleteUserToRecruitLike.handle(authUser.uid, recruitId);
  }
}
