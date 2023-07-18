import { Module } from '@nestjs/common';
import { EmployeeToProductLikeController } from './employee-to-product-like.controller';
import { EmployeeToProductLikeService } from './employee-to-product-like.service';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeToProductLike } from './use-case/create-employee-to-product-like';
import { EmployeeService } from 'src/employee/employee.service';

@Module({
  controllers: [EmployeeToProductLikeController],
  providers: [
    EmployeeToProductLikeService,
    PrismaService,
    CreateEmployeeToProductLike,
    EmployeeService
  ]
})
export class EmployeeToProductLikeModule {}
