import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { CreateUserWithEmailInput } from '../dto/create-user-with-email.input';
import { UserWithTokenEntity } from '../entities/user-with-token.entity';
import { CreateUser } from './create-user';

@Injectable()
export class CreateUserWithEmail {
  constructor(
    private readonly authService: AuthService,
    private readonly createUser: CreateUser,
  ) {}
  async handle(
    input: CreateUserWithEmailInput,
  ): Promise<UserWithTokenEntity | null> {
    let authUser = null;

    try {
      //firebase authのユーザーを作成
      authUser = await this.authService.createUser(input.email, input.password);

      //フロント側でemailとパスワード以外を使ってサインインするためのトークン
      const token = await this.authService.createCustomToken(authUser.uid);

      //MySQLのテーブルに新しいuserレコードを作成するための一連の処理
      const user = await this.createUser.handle({
        ...input,
        firebaseUID: authUser.uid,
      });

      return { ...user, token };
    } catch (err) {
      // firebaseでのユーザー作成は成功し、その他が失敗した場合は、作成したfirebaseのユーザーは削除
      if (authUser?.uid) {
        await this.authService.deleteUser(authUser.uid);
      }
      throw new Error(`ユーザー登録に失敗しました: ${err}`);
    }
  }
}
