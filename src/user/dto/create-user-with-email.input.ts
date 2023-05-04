import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';

export class CreateUserWithEmailInput extends CreateUserInput {
  @IsString()
  @IsNotEmpty()
  password!: string;
}
