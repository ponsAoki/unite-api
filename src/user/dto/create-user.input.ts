import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  firebaseUID?: string;
}
