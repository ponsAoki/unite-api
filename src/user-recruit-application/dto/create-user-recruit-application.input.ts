import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRecruitApplicationInput {
  @IsNotEmpty()
  @IsString()
  recruitId: string;
}
