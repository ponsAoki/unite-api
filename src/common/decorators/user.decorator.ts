import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // ここで、ログインしてるユーザー情報を返したい
  },
);
