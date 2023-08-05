import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

}
