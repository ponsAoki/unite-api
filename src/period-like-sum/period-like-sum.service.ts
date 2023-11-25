import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PeriodLikeSum, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PeriodLikeSumService {
  constructor(private readonly prismaService: PrismaService) {}

  //昇順にソートする
  @Cron('0 0 */12 * * *')
  findAllToSortByFixedTime(): PrismaPromise<PeriodLikeSum[]> {
    return this.prismaService.periodLikeSum.findMany({
      take: 10,
      orderBy: {
        likesCount: 'desc',
      },
      include: {
        product: true,
      },
    });
  }

  //更新or新規作成
  upsert(productId: string, totalLikes: number, id?: string) {
    return this.prismaService.periodLikeSum.upsert({
      where: { id },
      update: {
        likesCount: totalLikes,
      },
      create: {
        productId,
        likesCount: totalLikes,
      },
    });
  }
}
