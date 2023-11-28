import { Module } from '@nestjs/common';
import { CorporateAuthService } from './corporate-auth.service';
import { CorporateAuthUtil } from './corporateAuth.util';

@Module({
  providers: [CorporateAuthService, CorporateAuthUtil],
})
export class CorporateAuthModule {}
