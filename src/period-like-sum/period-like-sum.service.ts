import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PeriodLikeSumService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  //新規作成
  create(productId: string, totalLikes: number) {
    return this.prismaService.periodLikeSum.create({
      data: {
        productId,
        likesCount: totalLikes
      }
    })
  }

  //countの更新
  update(id: string, totalLikes: number) {
    return this.prismaService.periodLikeSum.update({
      where: { id },
      data: {
        likesCount: totalLikes
      }
    })
  }
}

