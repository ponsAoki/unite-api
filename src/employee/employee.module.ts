import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeWithEmail } from './use-case/create-employee-with-email';
import { AuthService } from 'src/common/auth/auth.service';
import { CreateEmployee } from './use-case/create-employee';
import { CorporationService } from 'src/corporation/corporation.service';
import { EmployeeService } from './employee.service';
import { CreateEmployeePolicy } from './policy/create-employee-policy';
import { CorporateAuthService } from 'src/common/auth/corporation/corporate-auth.service';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    PrismaService,
    CreateEmployeeWithEmail,
    CorporateAuthService,
    CreateEmployee,
    CorporationService,
    CreateEmployeePolicy
  ]
})
export class EmployeeModule {}


// ?、CorporateAuthService、CreateEmployee、CorporationService)