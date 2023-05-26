import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCorporationInput {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  sharedPassword?: string;

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
