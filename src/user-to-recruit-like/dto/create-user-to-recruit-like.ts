import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserToRecruitLikeInput {
  @IsString()
  @IsNotEmpty()
  recruitId!: string;
}
