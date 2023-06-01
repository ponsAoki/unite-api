import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserInput {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  prefecture?: string;

  @IsString()
  @IsOptional()
  university?: string;

  @IsString()
  @IsOptional()
  undergraduate?: string;

  @IsString()
  @IsOptional()
  graduateYear?: string;

  @IsString()
  @IsOptional()
  selfPublicity?: string;

  @IsString()
  @IsOptional()
  careerVision?: string;

  @IsString()
  @IsOptional()
  programingSkills?: object;
}
