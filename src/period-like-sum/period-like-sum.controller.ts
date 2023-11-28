import { Controller, Get } from '@nestjs/common';
import { PeriodLikeSum } from '@prisma/client';
import { PeriodLikeSumService } from './period-like-sum.service';

@Controller('period-like-sum')
export class PeriodLikeSumController {
  constructor(private readonly periodLikeSumJobService: PeriodLikeSumService) {}

  //全件取得(job化されている)
  @Get()
  async findAll(): Promise<PeriodLikeSum[]> {
    return await this.periodLikeSumJobService.findAllToSortByFixedTime();
  }
}
