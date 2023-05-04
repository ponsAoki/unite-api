import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class CreateUserPolicy {
  constructor(private readonly userService: UserService) {}

  //同じemailで登録されているユーザーが既に存在する場合、エラーをスロー
  async handle(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) return;

    if (user.firebaseUID) {
      throw new Error('すでに登録済みのユーザーのメールアドレスです');
    }
  }
}
