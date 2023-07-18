import { Injectable } from "@nestjs/common";
import { EmployeeToProductLikeService } from "../employee-to-product-like.service";
import { ALREADY_EXISTS_LIKE } from "src/common/constants/message";

@Injectable()
export class CreateEmployeeToProductLike {
  constructor(
    private readonly employeeToProductService: EmployeeToProductLikeService,
  ) {}

  async handle(employeeId: string, productId: string ) {
    //すでにいいねを作成していないかチェックする
    const specificLike = await this.employeeToProductService.findOne(employeeId, productId);

    if (specificLike !== null) {
      throw Error(ALREADY_EXISTS_LIKE);
    }

    await this.employeeToProductService.create(employeeId, productId);
  }
}