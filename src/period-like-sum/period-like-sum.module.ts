import { Module } from '@nestjs/common';
import { PeriodLikeSumController } from './period-like-sum.controller';
import { PeriodLikeSumService } from './period-like-sum.service';
import { ProductService } from 'src/product/product.service';
import { PrismaService } from 'src/prisma.service';
import { CreateOrUpdateLikeSumJob } from './use-case/create-or-update-like-sum.job';
import { FindTenProductLikesSumWithProduct } from './use-case/find-ten-peropd-like-sum-with-product';

@Module({
  controllers: [PeriodLikeSumController],
  providers: [
    PeriodLikeSumService,
    ProductService,
    PeriodLikeSumService,
    PrismaService,
    CreateOrUpdateLikeSumJob,
    FindTenProductLikesSumWithProduct
  ]
})
export class PeriodLikeSumModule {}

