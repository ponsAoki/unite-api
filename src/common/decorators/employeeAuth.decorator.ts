import { ExecutionContext, createParamDecorator } from "@nestjs/common";

//企業側のカスタムデコレーター
export const FirebaseAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.firebaseAuth
  }
)