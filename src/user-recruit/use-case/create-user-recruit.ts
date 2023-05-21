import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UserService } from 'src/user/user.service';
import { UpdateUserRecruitInput } from '../dto/update-user-recruit.input';
import { UserRecruitEntity } from '../entities/user-recruit.entity';
import { ManipulateUserRecruitPolicy } from '../policy/manipulate-user-recruit.policy';
import { CreateUserRecruitInput } from '../dto/create-user-recruit.input';

@Injectable()
export class CreateUserRecruit {
  constructor(
    private readonly userService: UserService,
    private readonly userRecruitService: UserRecruitService,
    private readonly manipulateUserRecruitPolicy: ManipulateUserRecruitPolicy,
  ) {}

  async handle(
    recruiterFirebaseUID: string,
    input: CreateUserRecruitInput,
  ): Promise<UserRecruitEntity> {
    const user = await this.userService.findByFirebaseUID(recruiterFirebaseUID);
    if (!user) throw new BadRequestException('user not found');

    return await this.userRecruitService.create(user.id, input);
  }
}
