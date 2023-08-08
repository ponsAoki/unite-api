import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/client';

export const FirebaseAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.firebaseAuth;
  },
);

export type UserAuthParam = {
  user: User;
};
