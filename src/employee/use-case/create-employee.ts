import { UserService } from "src/user/user.service";
import { CreateEmployeeInput } from "../dto/create-employee.input";
import { EmployeeEntity } from "../entities/employee.entity";
import { EmployeeService } from "../employee.service";
import { Employee } from "@prisma/client";

//ここではprism上でemployeeを作成している
export class CreateEmployee {
  constructor(
    private readonly  employeeService: EmployeeService,
  ) {}

  async handle(input: CreateEmployeeInput, corporationId: string): Promise<EmployeeEntity> {
    // let employee: Employee | null
    // //同じemailで登録されているユーザーがいるかのチェック
    // employee = await this.employeeService.findByEmail(input.email);
    // if(!employee) return
    // if(employee.firebaseUID) {
    //   throw new Error('すでに登録済みのメールアドレスです')
    // }
    const employee = await this.employeeService.create({
        email: input.email,
        firebaseUID: input.firebaseUID
      },
      corporationId)
    return employee
  }
}
