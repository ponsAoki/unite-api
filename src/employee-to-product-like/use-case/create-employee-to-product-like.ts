import { ConflictException, Injectable } from '@nestjs/common';
import { EmployeeToProductLikeService } from '../employee-to-product-like.service';
import { ALREADY_EXISTS_LIKE } from 'src/common/constants/message';
import { EmployeeToProductLike } from '@prisma/client';

@Injectable()
export class CreateEmployeeToProductLike {
  constructor(
    private readonly employeeToProductService: EmployeeToProductLikeService,
  ) {}

  async handle(
    employeeId: string,
    productId: string,
  ): Promise<EmployeeToProductLike> {
    //すでにいいねを作成していないかチェックする
    const specificLike = await this.employeeToProductService.findOne(
      employeeId,
      productId,
    );

    if (specificLike !== null) {
      throw new ConflictException(ALREADY_EXISTS_LIKE);
    }
    return await this.employeeToProductService.create(employeeId, productId);
  }
}
