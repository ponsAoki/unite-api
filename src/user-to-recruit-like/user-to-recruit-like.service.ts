import { Injectable } from '@nestjs/common';
import { PrismaPromise, UserToRecruitLike } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserToRecruitLikeService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  create(userId: string, recruitId: string): PrismaPromise<UserToRecruitLike> {
    return this.prismaService.userToRecruitLike.create({ data: {userId, recruitId} })
  }
  
  delete(id: string): PrismaPromise<UserToRecruitLike> {
    return this.prismaService.userToRecruitLike.delete({ where: { id } })
  }
 }
