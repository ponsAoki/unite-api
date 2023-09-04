import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PeriodLikeSum, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PeriodLikeSumEntity } from './entites/period-like-sum.entity';

@Injectable()
export class PeriodLikeSumService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  // @Cron('0 0 */12 * * *')
  // findTenToSortByFixedTime() {
  //   return this.prismaService.periodLikeSum.findMany({
  //     take: 10,
  //     orderBy: {
  //       likesCount: 'desc'
  //     }
  //   });
  // }

  昇順にソートする
  @Cron('0 0 */12 * * *')
  findAllToSortByFixedTime(): PrismaPromise<PeriodLikeSumEntity[]> {
    return this.prismaService.periodLikeSum.findMany({
      take: 10,
      orderBy: {
        likesCount: 'desc'
      },
      include: {
        product: {
          include: {
            recruit: {
              include: {
                recruiter: true,
                userRecruitParticipant: {
                  include: {
                    user: true
                  },
                  where: {
                    isApproved: true
                  }
                },
              }
            },
          }
        },
      }
    })
  }

  //更新or新規作成
  upsert( productId: string, totalLikes: number, id?: string): PrismaPromise<PeriodLikeSum> {
    return this.prismaService.periodLikeSum.upsert({
      where: {id},
      update: {
        likesCount: totalLikes
      },
      create: {
        productId,
        likesCount: totalLikes,
      }
    })
  }
}

