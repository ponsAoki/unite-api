import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateProductInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsOptional()
  skills?: string[];

  @IsString()
  @IsOptional()
  reasonForSkillSelection?: string;

  @IsString()
  @IsOptional()
  developmentBackground?: string;

  @IsString()
  @IsOptional()
  overview?: string;
}