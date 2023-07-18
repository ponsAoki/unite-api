import { Module } from '@nestjs/common';
import { PeriodLikeSumController } from './period-like-sum.controller';
import { PeriodLikeSumService } from './period-like-sum.service';
import { ProductService } from 'src/product/product.service';
import { PrismaService } from 'src/prisma.service';
import { PeriodLikeSumJobService } from './period-like-sum.job.service';
import { CreateOrUpdateLikeSumJob } from './use-case/create-or-update-like-sum.job';

@Module({
  controllers: [PeriodLikeSumController],
  providers: [
    PeriodLikeSumService,
    ProductService,
    PeriodLikeSumService,
    PeriodLikeSumJobService,
    PrismaService,
    CreateOrUpdateLikeSumJob
  ]
})
export class PeriodLikeSumModule {}

