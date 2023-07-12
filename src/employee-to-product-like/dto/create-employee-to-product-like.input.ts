import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeToProductLikeInput {
  @IsString()
  @IsNotEmpty()
  productId: string
}