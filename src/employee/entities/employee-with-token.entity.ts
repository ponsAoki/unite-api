import { EmployeeEntity } from './employee.entity';

export class EmployeeWithTokenEntity extends EmployeeEntity {
  token!: string;
}
