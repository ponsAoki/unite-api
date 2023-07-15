import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUtil } from './auth.util';

@Module({
  providers: [AuthService, AuthUtil],
})
export class AuthModule {}
