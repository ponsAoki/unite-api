import { Module } from '@nestjs/common';
import { EmployeeToProductLikeController } from './employee-to-product-like.controller';
import { EmployeeToProductLikeService } from './employee-to-product-like.service';

@Module({
  controllers: [EmployeeToProductLikeController],
  providers: [EmployeeToProductLikeService]
})
export class EmployeeToProductLikeModule {}
