import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeWithEmail } from './use-case/create-employee-with-email';
import { AuthService } from 'src/common/auth/auth.service';
import { CreateEmployee } from './use-case/create-employee';
import { CorporationService } from 'src/corporation/corporation.service';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    PrismaService,
    CreateEmployeeWithEmail,
    AuthService,
    CreateEmployee,
    CorporationService
  ]
})
export class EmployeeModule {}
