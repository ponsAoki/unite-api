import { Injectable } from '@nestjs/common';
import { PrismaPromise, UserTORecruitLike } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserToRecruitLikeService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  create(userId: string, recruitId: string): PrismaPromise<UserTORecruitLike> {
    return this.prismaService.userTORecruitLike.create({ data: {userId, recruitId} })
  }
  
  delete(id: string): PrismaPromise<UserTORecruitLike> {
    return this.prismaService.userTORecruitLike.delete({ where: { id } })
  }
 }
