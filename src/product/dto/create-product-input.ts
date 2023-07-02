import { IsOptional, IsString } from 'class-validator';

export class createProductInput {
  @IsString()
  recruitId!: string;

  @IsString()
  @IsOptional()
  headline: string;

  @IsString()
  @IsOptional()
  detail: string;

  @IsString()
  @IsOptional()
  url: string;
}
