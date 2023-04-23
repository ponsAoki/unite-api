import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRecruitInput {
  @IsNotEmpty()
  @IsString()
  recruitId!: string;

  @IsNotEmpty()
  @IsString()
  recruiterId!: string;
}
