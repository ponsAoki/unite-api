import { Injectable } from '@nestjs/common';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UpdateRecruitInput } from '../dto/update-recruite.input';
import { RecruitEntity } from '../entities/recruit.entity';
import { ManipulateUserRecruitPolicy } from '../policy/manipulate-user-recruit.policy';
import { RecruitService } from '../recruit.service';

@Injectable()
export class UpdateUserRecruit {
  constructor(
    private readonly userRecruitService: UserRecruitService,
    private readonly manipulateUserRecruitPolicy: ManipulateUserRecruitPolicy,
    private readonly recruitService: RecruitService,
  ) {}

  async handle(
    recruitId: string,
    recruiterId: string,
    input: UpdateRecruitInput,
  ): Promise<RecruitEntity> {
    //更新しようとしている募集が操作ユーザーが作成したものかチェック
    await this.manipulateUserRecruitPolicy.handle(recruitId, recruiterId);

    return await this.recruitService.update(recruitId, input);
  }
}
