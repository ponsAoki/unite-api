import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/common/auth/user/auth.service';
import { CreateUserWithEmailInput } from '../dto/create-user-with-email.input';
import { UserWithTokenEntity } from '../entities/user-with-token.entity';
import { CreateUser } from './create-user';
import { EXIST_MAIL_ADDRESS } from 'src/common/constants/message';

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
      authUser = await this.authService
        .createUser(input.email, input.password)
        .catch((error) => {
          if (error.code === 'auth/email-already-exists') {
            throw new BadRequestException(EXIST_MAIL_ADDRESS);
          }
          throw error;
        });

      //フロント側でemailとパスワード以外を使ってサインインするためのトークン
      const token = await this.authService.createCustomToken(authUser.uid);

      //MySQLのテーブルに新しいuserレコードを作成するための一連の処理
      const user = await this.createUser.handle({
        email: input.email,
        firebaseUID: authUser.uid,
      });

      return { ...user, token };
    } catch (error) {
      // firebaseでのユーザー作成は成功し、その他が失敗した場合は、作成したfirebaseのユーザーは削除
      if (authUser?.uid) {
        await this.authService.deleteUser(authUser.uid);
      }

      throw error;
    }
  }
}
