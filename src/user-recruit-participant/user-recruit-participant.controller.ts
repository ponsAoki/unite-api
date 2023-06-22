import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateUserRecruitParticipantInput } from './dto/create-user-recruit-participant-input';
import { UserRecruitParticipantService } from './user-recruit-participant.service';

@Controller('user-recruit-participant')
export class UserRecruitParticipantController {
  constructor(
    private readonly userRecruitParticipantService: UserRecruitParticipantService
  ) {}

  @Get()
  findAll() {
    return this.userRecruitParticipantService.findAll()
  }
  //一件のrecruitに対する全件取得
  @Post('find-many-by-userRecruit')
  async findManyByUserRecruit(
    @Body() input: {userRecruitId: string}
  ) {
    return this.userRecruitParticipantService.findManyByRecruitId(input.userRecruitId)
  }

  //参加者から参加依頼を出したときに走る
  @Post('applyForJoin')
  async create(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateUserRecruitParticipantInput
  ) {

    return await this.userRecruitParticipantService.create(authUser.uid, input)
  }

  //recruitの募集主が承認を押した時に状態をtrueにする。
  @Put(':id/approve')
  async approveParticipant(
    @Param('id') id: string
  ) {
    return await this.userRecruitParticipantService.approveParticipant(id)
  }

  //recruitの募集主が拒否した場合にテーブルを破棄する。
}
