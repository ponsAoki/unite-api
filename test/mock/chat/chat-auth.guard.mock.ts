import { ExecutionContext } from '@nestjs/common';

export class ChatAuthGuardMock {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();

    req.user = {
      id: 'userId0',
      firebaseUID: 'firebaseUid0',
      email: 'test0@test.com',
      name: 'name0',
      imageUrl: 'imageUrl0',
    };

    return !!req.user;
  }
}
