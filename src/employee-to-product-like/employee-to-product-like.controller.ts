import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmployeeToProductLikeService } from './employee-to-product-like.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { CreateEmployeeToProductLikeInput } from './dto/create-employee-to-product-like.input';

@Controller('employee-to-product-like')
export class EmployeeToProductLikeController {
  constructor(
    private readonly employeeToProductLikeService: EmployeeToProductLikeService
  ) {}

  @Post()
  @UseGuards(AuthGuard) //企業側のguardに変更する
  async createLike(
    @FirebaseAuth() authUser: any,
    @Body() input: CreateEmployeeToProductLikeInput
  ) {
    //FirebaseUIDからId(主キー)を取得する
    return await this.employeeToProductLikeService.create(authUser.uid, input.productId)
  }

}
