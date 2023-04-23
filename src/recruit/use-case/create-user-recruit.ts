import { Injectable } from '@nestjs/common';
import { Recruit } from '@prisma/client';
import { UtilService } from 'src/common/utils/util.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRecruitInput } from 'src/user-recruit/dto/create-user-recruit.input';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { CreateRecruitInput } from '../dto/create-recruit.input';
import { CreateSystemRecruitInput } from '../dto/create-system-recruit.input';
import { RecruitService } from '../recruit.service';

@Injectable()
export class CreateUserRecruit {
  constructor(
    private readonly utilService: UtilService,
    private readonly recruitService: RecruitService,
    private readonly userRecruitService: UserRecruitService,
    private readonly prismaService: PrismaService,
  ) {}

  async handle(
    recruiterId: string,
    recruitInput: CreateRecruitInput,
  ): Promise<Recruit> {
    const recruitId = this.utilService.cuid();

    const systemRecruitInput: CreateSystemRecruitInput = {
      ...recruitInput,
      id: recruitId,
    };
    const createRecruit = this.recruitService.create(systemRecruitInput);

    const userRecruitInput: CreateUserRecruitInput = {
      recruitId,
      recruiterId,
    };
    const createUserRecruit = this.userRecruitService.create(userRecruitInput);

    const [recruit] = await this.prismaService.$transaction([
      createRecruit,
      createUserRecruit,
    ]);

    return recruit;
  }
}
