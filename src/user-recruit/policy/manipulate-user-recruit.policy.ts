import { Injectable } from '@nestjs/common';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';

@Injectable()
export class ManipulateUserRecruitPolicy {
  constructor(private readonly userRecruitService: UserRecruitService) {}

  //ユーザー募集データを更新・削除する権限があるかどうかをチェックする
  async handle(id: string, recruiterId: string): Promise<void> {
    const userRecruit = await this.userRecruitService.findByIdAndRecruiterId(
      id,
      recruiterId,
    );
    if (!userRecruit) {
      throw new Error('募集データを操作する権限がありません');
    }
  }
}
