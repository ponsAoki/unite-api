import { Injectable } from '@nestjs/common';
import { PrismaPromise, UserRecruitApplication } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRecruitApplicationInput } from './dto/create-user-recruit-application.input';

@Injectable()
export class UserRecruitApplicationService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): PrismaPromise<UserRecruitApplication[]> {
    return this.prismaService.userRecruitApplication.findMany();
  }

  findByApplicantIdAndRecruitId(
    applicantId: string,
    recruitId: string,
  ): PrismaPromise<UserRecruitApplication> {
    return this.prismaService.userRecruitApplication.findFirst({
      where: {
        applicantId,
        recruitId,
      },
    });
  }

  create(
    input: CreateUserRecruitApplicationInput & { applicantId: string },
  ): PrismaPromise<UserRecruitApplication> {
    return this.prismaService.userRecruitApplication.create({ data: input });
  }
}
