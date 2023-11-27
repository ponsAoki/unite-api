import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class createProductInput {
  @IsString()
  @IsNotEmpty()
  recruitId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  @IsNotEmpty()
  skills!: string[];

  @IsString()
  @IsNotEmpty()
  reasonForSkillSelection!: string;

  @IsString()
  @IsNotEmpty()
  developmentBackground!: string;

  @IsString()
  @IsNotEmpty()
  overview!: string;
}
