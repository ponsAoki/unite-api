import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRecruitInput {
  @IsNotEmpty()
  @IsString()
  headline!: string;

  @IsNotEmpty()
  @IsString()
  hackthonName!: string;

  @IsString()
  details?: string;

  @IsArray()
  programingSkills: string[];

  @IsString()
  developmentPeriod?: string;

  @IsString()
  hackathonUrl?: string;

  @IsNotEmpty()
  @IsString()
  numberOfApplicants!: string;
}
