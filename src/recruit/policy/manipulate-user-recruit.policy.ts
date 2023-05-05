import { Injectable } from '@nestjs/common';
import { UserRecruit } from '@prisma/client';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';

@Injectable()
export class ManipulateUserRecruitPolicy {
  constructor(private readonly userRecruitService: UserRecruitService) {}

  //ユーザー募集データを更新・削除する権限があるかどうかをチェックする
  async handle(
    recruitId: string,
    recruiterId: string,
  ): Promise<UserRecruit | null> {
    const userRecruit =
      await this.userRecruitService.findByRecruitIdAndRecruiterId(
        recruitId,
        recruiterId,
      );
    if (!userRecruit) {
      throw new Error('募集データを操作する権限がありません');
    }
    return userRecruit;
  }
}
