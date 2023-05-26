import { Injectable } from "@nestjs/common";
import { AuthService } from "src/common/auth/auth.service";
import { CreateEmployeeWithEmailInput } from "src/employee/dto/create-employee-with-email.input";
import { EmployeeWithTokenEntity } from "src/employee/entities/employee-with-token.entity";
import { CreateEmployee } from "./create-employee";
import { CorporationService } from "src/corporation/corporation.service";

//firebaseでemailとpasswordから認証する
@Injectable()
export class CreateEmployeeWithEmail {
  constructor(
    private readonly authService: AuthService,
    private readonly createEmployee: CreateEmployee,
    private readonly corporationService: CorporationService
  ) {}

  async handle(
    //passwordとemailが必須で要求されている。
    input: CreateEmployeeWithEmailInput,
  ): Promise<EmployeeWithTokenEntity> {
    let authEmployee = null;

    const corporation = await this.corporationService.findBySharedPassword(input.sharedPassword);

    //フロントにエラー文を送れるようにしたい。
    if (!corporation) throw new Error("Not found corporation")

    try {
      authEmployee = await this.authService.createUser(input.email, input.password);

      const token =  await this.authService.createCustomToken(authEmployee.uid);

      const employee = await this.createEmployee.handle({
        ...input,
        firebaseUID: authEmployee.uid
      }, corporation.id)


      return {...employee, token}
    } catch (err){
      if (authEmployee?.uid) {
        await this.authService.deleteUser(authEmployee.uid);
      }
      throw new Error(`ユーザー登録に失敗しました: ${err}`);
    }
  }
}
