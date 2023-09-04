import { Controller, Get } from '@nestjs/common';
import { PeriodLikeSumService } from './period-like-sum.service';
// import { FindTenProductLikesSumWithProduct } from './use-case/find-ten-peropd-like-sum-with-product';
import { PeriodLikeSumEntity } from './entites/period-like-sum.entity';

@Controller('period-like-sum')
export class PeriodLikeSumController {
  constructor(
    private readonly periodLikeSumJobService: PeriodLikeSumService,
  ) {}

  //全件取得(job化されている)
  @Get()
  async findAll(): Promise<PeriodLikeSumEntity[]> {
    return await this.periodLikeSumJobService.findAllToSortByFixedTime();
  }

}
