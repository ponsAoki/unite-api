import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateUserInput {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  age?: string | number;

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
  githubAccount?: string;

  @IsString()
  @IsOptional()
  selfPublicity?: string;

  @IsString()
  @IsOptional()
  careerVision?: string;

  @IsArray()
  @IsOptional()
  programingSkills?: string[] | undefined;
}
