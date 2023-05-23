import { CreateEmployeeInput } from "../dto/create-employee.input";
import { EmployeeEntity } from "../entities/employee.entity";
import { EmployeeService } from "../employee.service";


//ここではprisma上でemployeeを作成している
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
    console.log(`確認　${this.employeeService}`)
    const employee = await this.employeeService.create({
        email: input.email,
        firebaseUID: input.firebaseUID
      },
      corporationId)

    console.log(`employee: ${employee.email}`)
    return employee
  }
}
