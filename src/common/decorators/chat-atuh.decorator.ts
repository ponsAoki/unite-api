import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserAuthParam } from './auth.decorator';
import { CompanyAuthParam } from './company-auth.decorator';

export const ChatAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    switch (true) {
      case !!req.user:
        return { user: req.user };
      case !!req.employee && !!req.corporation:
        return { corporation: req.corporation, employee: req.employee };
      default:
        break;
    }
  },
);

export type ChatAuthParam = UserAuthParam & CompanyAuthParam;
