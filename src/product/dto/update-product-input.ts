import { IsOptional, IsString } from "class-validator";

export class updateProductInput {
  @IsString()
  @IsOptional()
  headline: string;

  @IsString()
  @IsOptional()
  detail: string;
}