import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeWithEmailInput } from './dto/create-employee-with-email.input';
import { EmployeeWithTokenEntity } from './entities/employee-with-token.entity';
import { CreateEmployeeWithEmail } from './use-case/create-employee-with-email';
import { EmployeeEntity } from './entities/employee.entity';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { CorporateAuthGuard } from 'src/common/guards/corporate-auth.guard';
import {
  CompanyAuth,
  CompanyAuthParam,
} from 'src/common/decorators/company-auth.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly createEmployeeWithEmail: CreateEmployeeWithEmail,
  ) {}

  //全体の社員を取得
  @Get()
  async findAll() {
    return this.employeeService.findAll();
  }
  //一意となる社員の取得
  @Get('find-by-firebaseUID')
  @UseGuards(CorporateAuthGuard)
  async findById(
    @CompanyAuth() { employee }: CompanyAuthParam,
  ): Promise<EmployeeEntity | null> {
    return await this.employeeService.findByIdWithCorporation(employee.id);
  }
  //社員情報の更新
  @Put('update-by-firebaseUID')
  @UseGuards(CorporateAuthGuard)
  async update(
    @CompanyAuth() { employee }: CompanyAuthParam,
    @Body() input: UpdateEmployeeInput,
  ) {
    return await this.employeeService.updateById(employee.id, input);
  }
  //会社に属する社員の登録
  @Post()
  async create(
    @Body() input: CreateEmployeeWithEmailInput,
  ): Promise<EmployeeWithTokenEntity> {
    return this.createEmployeeWithEmail.handle(input);
  }
}
