import { IsOptional, IsString } from "class-validator";

export class createProductInput {
  @IsString()
  recruitId!: string;

  @IsString()
  @IsOptional()
  headline: string;

  @IsString()
  @IsOptional()
  url: any;

  @IsString()
  @IsOptional()
  detail: string;

}
