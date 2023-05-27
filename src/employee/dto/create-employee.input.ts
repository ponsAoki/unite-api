import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeInput {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  firebaseUID?: string;
}
