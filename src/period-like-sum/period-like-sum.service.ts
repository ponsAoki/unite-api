import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PeriodLikeSumService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  //更新or新規作成
  upsert( productId: string, totalLikes: number, id?: string,) {
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

