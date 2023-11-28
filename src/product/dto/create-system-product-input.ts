import { IsNotEmpty, IsString } from 'class-validator';
import { createProductInput } from './create-product-input';

export class CreateSystemProductInput extends createProductInput {
  @IsString()
  @IsNotEmpty()
  url: string;
}
