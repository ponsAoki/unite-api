import { Injectable } from '@nestjs/common';
import { PrismaPromise, UserRecruitApplication } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRecruitApplicationInput } from './dto/create-user-recruit-application.input';

@Injectable()
export class UserRecruitApplicationService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    input: CreateUserRecruitApplicationInput & { applicantId: string },
  ): PrismaPromise<UserRecruitApplication> {
    return this.prismaService.userRecruitApplication.create({ data: input });
  }
}
