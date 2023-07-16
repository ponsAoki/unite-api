import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ChatSender = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToWs().getClient();
    return req.sender;
  },
);
