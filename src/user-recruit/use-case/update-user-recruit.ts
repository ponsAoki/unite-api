import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UserService } from 'src/user/user.service';
import { UpdateUserRecruitInput } from '../dto/update-user-recruit.input';
import { UserRecruitEntity } from '../entities/user-recruit.entity';
import { ManipulateUserRecruitPolicy } from '../policy/manipulate-user-recruit.policy';

@Injectable()
export class UpdateUserRecruit {
  constructor(
    private readonly userService: UserService,
    private readonly userRecruitService: UserRecruitService,
    private readonly manipulateUserRecruitPolicy: ManipulateUserRecruitPolicy,
  ) {}

  async handle(
    id: string,
    recruiterFirebaseUID: string,
    input: UpdateUserRecruitInput,
  ): Promise<UserRecruitEntity> {
    const user = await this.userService.findByFirebaseUID(recruiterFirebaseUID);
    if (!user) throw new ForbiddenException('募集を作成する権限がありません。');

    const { numberOfApplicants: stringApplicants, ...rest } = input;
    const numberOfApplicants = Number(stringApplicants);

    //更新しようとしている募集が操作ユーザーが作成したものかチェック
    await this.manipulateUserRecruitPolicy.handle(id, user.id);

    return await this.userRecruitService.update(id, {
      numberOfApplicants,
      ...rest,
    });
  }
}
