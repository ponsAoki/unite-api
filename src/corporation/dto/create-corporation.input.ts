import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateCorporationInput {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  sharedPassword!: string;

  @IsString()
  name: string;

  @IsString()
  @IsEmpty()
  imageUrl?: string;

  @IsString()
  DescriptionOfBusiness: string;

  @IsString()
  location: string;

  @IsString()
  phoneNumber: string;
}
