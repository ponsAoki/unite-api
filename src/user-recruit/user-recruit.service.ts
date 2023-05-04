import { Injectable } from '@nestjs/common';
import { PrismaPromise, UserRecruit } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRecruitInput } from './dto/create-user-recruit.input';

@Injectable()
export class UserRecruitService {
  constructor(private readonly prismaService: PrismaService) {}

  create(userRecruit: CreateUserRecruitInput): PrismaPromise<UserRecruit> {
    return this.prismaService.userRecruit.create({ data: userRecruit });
  }
}
