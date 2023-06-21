import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const FirebaseAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    console.log(`ここでの確認事項 ${req.firebaseAuth}`)
    return req.firebaseAuth;
  },
);
