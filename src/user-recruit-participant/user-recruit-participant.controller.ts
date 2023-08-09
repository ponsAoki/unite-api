import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserRecruitParticipantInput } from './dto/create-user-recruit-participant-input';
import { UserRecruitParticipantService } from './user-recruit-participant.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('user-recruit-participant')
export class UserRecruitParticipantController {
  constructor(
    private readonly userRecruitParticipantService: UserRecruitParticipantService,
    private readonly userService: UserService,
  ) {}

  @Get()
  findAll() {
    return this.userRecruitParticipantService.findAll();
  }
  //一件のrecruitに対する全件取得
  @Post('find-many-by-userRecruit')
  async findManyByUserRecruit(@Body() input: { userRecruitId: string }) {
    return this.userRecruitParticipantService.findManyByRecruitId(
      input.userRecruitId,
    );
  }

  //参加者から参加依頼を出したときに走る
  @Post('applyForJoin')
  @UseGuards(AuthGuard)
  async create(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserRecruitParticipantInput,
  ) {
    const user = await this.userService.findByFirebaseUID(authUser.uid);
    return await this.userRecruitParticipantService.create(user.id, input);
  }

  //recruitの募集主が承認を押した時に状態をtrueにする。
  @Put(':id/approve')
  async approveParticipant(@Param('id') id: string) {
    return await this.userRecruitParticipantService.approveParticipant(id);
  }

  //recruitの募集主が拒否した場合にテーブルを破棄する。
  @Delete(':id/reject')
  async rejectParticipant(@Param('id') id: string) {
    return await this.userRecruitParticipantService.rejectParticipant(id);
  }
}
