import { IsOptional, IsString } from 'class-validator';

export class UpdateCorporationInput {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  sharedPassword?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  descriptionOfBusiness?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
