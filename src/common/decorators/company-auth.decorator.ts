import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Corporation, Employee } from '@prisma/client';

//企業側のカスタムデコレーター
export const CompanyAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return { corporation: req.corporation, employee: req.employee };
  },
);

export type CompanyAuthParam = {
  corporation: Corporation;
  employee: Employee;
};
