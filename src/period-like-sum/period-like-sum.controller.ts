import { Controller, Get } from '@nestjs/common';
import { PeriodLikeSum } from '@prisma/client';
import { PeriodLikeSumService } from './period-like-sum.service';
import { FindTenProductLikesSumWithProduct } from './use-case/find-ten-peropd-like-sum-with-product';
import { ProductWithLikeCountEntity } from './entites/product-with-like-count.entity';

@Controller('period-like-sum')
export class PeriodLikeSumController {
  constructor(
    private readonly periodLikeSumJobService: PeriodLikeSumService,
    private readonly findTenProductLikesSumWithProduct: FindTenProductLikesSumWithProduct
  ) {}

  //全件取得(job化されている)
  @Get()
  async findAll(): Promise<ProductWithLikeCountEntity[]> {
    return await this.findTenProductLikesSumWithProduct.handle()
  }

}
