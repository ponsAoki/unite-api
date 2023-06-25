import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';

export class CreateUserWithGoogleOrGithubInput implements CreateUserInput {
  @IsString()
  @IsNotEmpty()
  firebaseUID!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
}
