import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserWithGoogleOrGithubInput } from '../dto/create-user-with-google-or-github.input';
import { CreateUser } from './create-user';
import { AuthService } from 'src/common/auth/auth.service';

@Injectable()
export class CreateUserWithGoogleOrGithubService {
  constructor(
    private readonly userService: UserService,
    private readonly createUser: CreateUser,
    private readonly authService: AuthService,
  ) {}

  async handle(input: CreateUserWithGoogleOrGithubInput) {
    //すでに同じfirebaseUIDを持つuserがいる = 2回目以降のサインインなので、return
    const user = await this.userService.findByFirebaseUID(input.firebaseUID);
    if (user) return;

    try {
      const user = await this.createUser.handle(input);
      return user;
    } catch (error) {
      //DBでのユーザー作成が結果的に失敗した場合はfirebase上のuserをバックエンド側から削除
      await this.authService.deleteUser(input.firebaseUID);

      throw error;
    }
  }
}