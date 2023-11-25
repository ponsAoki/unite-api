import { Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from '../dto/create-employee.input';
import { EmployeeService } from '../employee.service';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeePolicy } from '../policy/create-employee-policy';

//ここではprisma上でemployeeを作成している
@Injectable()
export class CreateEmployee {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly createEmployeePolicy: CreateEmployeePolicy,
  ) {}

  async handle(
    input: CreateEmployeeInput,
    corporationId: string,
  ): Promise<EmployeeEntity> {
    await this.createEmployeePolicy.handle(input.email);
    const employee = await this.employeeService.create(
      {
        email: input.email,
        firebaseUID: input.firebaseUID,
      },
      corporationId,
    );

    return employee;
  }
}
