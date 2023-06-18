import { ExecutionContext } from '@nestjs/common';

export class AuthGuardMock {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    req.firebaseAuth = { uid: 'firebaseUid0' };
    return !!req.firebaseAuth;
  }
}
