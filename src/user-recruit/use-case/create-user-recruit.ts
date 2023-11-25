import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UserService } from 'src/user/user.service';
import { CreateUserRecruitInput } from '../dto/create-user-recruit.input';
import { UserRecruitEntity } from '../entities/user-recruit.entity';

@Injectable()
export class CreateUserRecruit {
  constructor(
    private readonly userService: UserService,
    private readonly userRecruitService: UserRecruitService,
  ) {}

  async handle(
    recruiterFirebaseUID: string,
    input: CreateUserRecruitInput,
  ): Promise<UserRecruitEntity> {
    const user = await this.userService.findByFirebaseUID(recruiterFirebaseUID);
    if (!user) throw new ForbiddenException('募集を作成する権限がありません。');
    const { numberOfApplicants: stringApplicants, ...rest } = input;
    const numberOfApplicants = Number(stringApplicants);

    return await this.userRecruitService.create(user.id, {
      ...rest,
      numberOfApplicants,
    });
  }
}
