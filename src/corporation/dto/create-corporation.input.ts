import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCorporationInput {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  sharedPassword!: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  DescriptionOfBusiness?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
