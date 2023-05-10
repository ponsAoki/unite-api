import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreateRecruitInput {
  @IsNotEmpty()
  @IsString()
  headline!: string;

  @IsNotEmpty()
  @IsString()
  hackthonName!: string;

  @IsString()
  details?: string;

  @IsJSON()
  programingSkills: string[];

  @IsString()
  developmentPeriod?: string;

  @IsString()
  hackathonUrl?: string;

  @IsNotEmpty()
  @IsString()
  numberOfApplicants!: string;
}
