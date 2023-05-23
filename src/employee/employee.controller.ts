import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeWithEmailInput } from './dto/create-employee-with-email.input';
import { EmployeeWithTokenEntity } from './entities/employee-with-token.entity';
import { CreateEmployeeWithEmail } from './use-case/create-employee-with-email';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly createEmployeeWithEmail: CreateEmployeeWithEmail
  ) {}

  //全体の社員を取得
  @Get()
  async findAll() {
    console.log("全件取得です")
    return this.employeeService.findAll()
  }
  //企業に属する社員の取得

  //一意となる社員の取得

  @Post()
  async create(
    @Body() input: CreateEmployeeWithEmailInput,
  ): Promise<EmployeeWithTokenEntity> {
    console.log("ユーザーが作成されました")
    return this.createEmployeeWithEmail.handle(input)
  }

}
