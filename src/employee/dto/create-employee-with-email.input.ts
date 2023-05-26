import { IsNotEmpty, IsString } from "class-validator";
import { CreateEmployeeInput } from "./create-employee.input";

export class CreateEmployeeWithEmailInput extends CreateEmployeeInput {
  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  sharedPassword!: string;
}
