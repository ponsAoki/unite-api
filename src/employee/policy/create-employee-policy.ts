import { Injectable } from "@nestjs/common";
import { EmployeeService } from "../employee.service";

@Injectable()
export class CreateEmployeePolicy {
  constructor( private readonly employeeService: EmployeeService) {}

  async handle(email: string): Promise<void> {
    const employee = await this.employeeService.findByEmail(email)
    if (!employee) return;

    if(employee.firebaseUID) {
      throw new Error("すでに登録済みのユーザーのメールアドレスです。")
    }
  }
}
