import { Injectable } from '@nestjs/common';
import { PrismaPromise, UserToRecruitLike } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserToRecruitLikeService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  findOne(userId: string, recruitId: string): PrismaPromise<UserToRecruitLike | null> {
    return this.prismaService.userToRecruitLike.findFirst({
      where: {
        userId,
        recruitId
      }
    });
  }
  

  create(userId: string, recruitId: string): PrismaPromise<UserToRecruitLike> {
    return this.prismaService.userToRecruitLike.create({ data: {userId, recruitId} })
  }
  
  delete(id: string): PrismaPromise<UserToRecruitLike> {
    return this.prismaService.userToRecruitLike.delete({ where: { id } })
  }
 }
