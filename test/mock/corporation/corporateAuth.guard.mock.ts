import { ExecutionContext } from '@nestjs/common';

export class CorporateAuthGuardMock {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    req.employee = {
      id: 'employeeId0',
      firebaseUID: 'firebaseUid0',
      corporationId: 'corporationId0',
      email: 'test0@test.com',
      name: 'name0',
      imageUrl: 'imageUrl0',
      introduction: 'hello, world',
      phoneNumber: '000-0000-0000'
    };
    return !!req.employee;
  }
}
