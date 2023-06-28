import { IsOptional, IsString } from "class-validator";

export class UpdateProductInput {
  @IsString()
  @IsOptional()
  headline: string;

  @IsString()
  @IsOptional()
  detail: string;
}