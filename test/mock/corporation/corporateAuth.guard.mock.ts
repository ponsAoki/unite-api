import { ExecutionContext } from '@nestjs/common';

export class CorporateAuthGuardMock {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    req.employee = {
      id: 'employeeId0',
      firebaseUID: 'firebaseUid0',
      corporationId: 'corporationId0',
      email: 'test10@test.com',
      name: 'name10',
      imageUrl: 'imageUrl10',
      introduction: 'hello, world',
      phoneNumber: '000-0000-0000'
    };
    return !!req.employee;
  }
}
