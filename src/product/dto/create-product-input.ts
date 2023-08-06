import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createProductInput {
  @IsString()
  @IsNotEmpty()
  recruitId!: string;

  @IsString()
  @IsNotEmpty()
  headline!: string;

  @IsString()
  @IsNotEmpty()
  detail!: string;

  @IsString()
  @IsNotEmpty()
  url!: string;
}
