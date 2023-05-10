import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { RecruitEntity } from '../entities/recruit.entity';
import { ManipulateUserRecruitPolicy } from '../policy/manipulate-user-recruit.policy';
import { RecruitService } from '../recruit.service';

@Injectable()
export class DeleteUserRecruit {
  constructor(
    private readonly userRecruitService: UserRecruitService,
    private readonly manipulateUserRecruitPolicy: ManipulateUserRecruitPolicy,
    private readonly recruitService: RecruitService,
    private readonly prismaService: PrismaService,
  ) {}

  async handle(recruitId: string, recruiterId: string): Promise<RecruitEntity> {
    //削除しようとしている募集が操作ユーザーが作成したものかチェック
    const userRecruit = await this.manipulateUserRecruitPolicy.handle(
      recruitId,
      recruiterId,
    );

    const deleteRecruit = this.recruitService.delete(recruitId);
    const deleteUserRecruit = this.userRecruitService.delete(userRecruit.id);

    const [, recruit] = await this.prismaService.$transaction([
      deleteUserRecruit,
      deleteRecruit,
    ]);

    return recruit;
  }
}
