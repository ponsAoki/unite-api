import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeToProductLikeInput } from './dto/create-employee-to-product-like.input';
import { CorporateAuthGuard } from 'src/common/guards/corporate-auth.guard';
import { EmployeeFirebaseAuth } from 'src/common/decorators/employeeAuth.decorator';
import { Employee } from '@prisma/client';
import { CreateEmployeeToProductLike } from './use-case/create-employee-to-product-like';

@Controller('employee-to-product-like')
export class EmployeeToProductLikeController {
  constructor(
    private readonly createEmployeeToProductLike: CreateEmployeeToProductLike
  ) {}

  //いいねを押す。
  @Post()
  @UseGuards(CorporateAuthGuard) //企業側のguardに変更する
  async createLike(
    @EmployeeFirebaseAuth() employee: Employee,
    @Body() input: CreateEmployeeToProductLikeInput
  ) {
      return await this.createEmployeeToProductLike.handle(employee.id, input.productId)
  }

}
