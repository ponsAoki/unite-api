import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeInput {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  firebaseUID?: string;
}
