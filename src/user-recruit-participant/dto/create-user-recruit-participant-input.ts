import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRecruitParticipantInput {
  @IsString()
  @IsNotEmpty()
  userRecruitId!: string;
}
