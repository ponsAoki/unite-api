import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  firebaseUID?: string;
}
