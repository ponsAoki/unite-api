import { Module } from '@nestjs/common';
import { AuthModule } from './common/auth/auth.module';
import { UserRecruitModule } from './user-recruit/user-recruit.module';
import { UserModule } from './user/user.module';
import { CorporationController } from './corporation/corporation.controller';
import { CorporationService } from './corporation/corporation.service';
import { PrismaService } from './prisma.service';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [UserModule, UserRecruitModule, AuthModule, EmployeeModule],
  controllers: [CorporationController],
  providers: [CorporationService, PrismaService],
})
export class AppModule {}
