import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserRecruitSystemInput {
  @IsNotEmpty()
  @IsString()
  headline!: string;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsNotEmpty()
  @IsString()
  hackathonName: string;

  @IsNotEmpty()
  @IsString()
  hackathonUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfApplicants!: number;

  @IsArray()
  programingSkills: string[];

  @IsString()
  @IsNotEmpty()
  developmentStartDate: string;

  @IsString()
  @IsNotEmpty()
  developmentEndDate: string;
}
