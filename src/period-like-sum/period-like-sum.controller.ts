import { Controller, Get } from '@nestjs/common';
import { PeriodLikeSum } from '@prisma/client';
import { PeriodLikeSumJobService } from './period-like-sum.job.service';

@Controller('period-like-sum')
export class PeriodLikeSumController {
  constructor(
    private readonly periodLikeSumJobService: PeriodLikeSumJobService,
  ) {}

  //全件取得(job化されている)
  @Get()
  async findAll(): Promise<PeriodLikeSum[]> {
    return await this.periodLikeSumJobService.findAllToSortByFixedTime()
  }

}
