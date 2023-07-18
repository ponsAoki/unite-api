import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PeriodLikeSum, PrismaPromise } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PeriodLikeSumJobService {
  constructor( 
    private readonly prismaService: PrismaService,
  ) {}
  
  //昇順にソートする
  // @Cron('0 0 */12 * * *')
  @Cron('40 * * * * *')
  findAllToSortByFixedTime(): PrismaPromise<PeriodLikeSum[]> {
    return this.prismaService.periodLikeSum.findMany({
      take: 10,
      orderBy: {
        likesCount: 'desc'
      },
      include: {
        product: true,
      }
    })
  }

}