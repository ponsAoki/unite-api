import { IsOptional, IsString } from 'class-validator';

export class createProductInput {
  @IsString()
  recruitId!: string;

  @IsString()
  headline!: string;

  @IsString()
  detail!: string;

  @IsString()
  url!: string;
}
