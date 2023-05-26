import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEmployeeInput {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  introduction?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
