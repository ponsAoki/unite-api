import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';

export class SignInWithGoogleInput implements CreateUserInput {
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

export class SignInWithGithubInput extends SignInWithGoogleInput {
  @IsString()
  @IsOptional()
  githubAccount?: string;
}
