import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UserEntity } from '../entities/user.entity';
import { CreateUserPolicy } from '../policy/create-user.policy';
import { UserService } from '../user.service';

@Injectable()
export class CreateUser {
  constructor(
    private readonly createUserPolicy: CreateUserPolicy,
    private readonly userService: UserService,
  ) {}

  async handle(input: CreateUserInput): Promise<UserEntity> {
    //同じemailで登録されているユーザーが既に存在しないかチェック
    await this.createUserPolicy.handle(input.email);

    const user = await this.userService.create({
      email: input.email,
      firebaseUID: input.firebaseUID,
    });

    return user;
  }
}
