import { Injectable } from "@nestjs/common";
import { AuthService } from "src/common/auth/user/auth.service";
import { CreateEmployeeWithEmailInput } from "src/employee/dto/create-employee-with-email.input";
import { EmployeeWithTokenEntity } from "src/employee/entities/employee-with-token.entity";
import { CreateEmployee } from "./create-employee";
import { CorporationService } from "src/corporation/corporation.service";
import { CorporateAuthService } from "src/common/auth/employee/corporate-auth.service";
import { FAIL_TO_FIND_CORPORATION } from "src/common/constants/message";

//firebaseでemailとpasswordから認証する
@Injectable()
export class CreateEmployeeWithEmail {
  constructor(
    private readonly corporateAuthService: CorporateAuthService,
    private readonly createEmployee: CreateEmployee,
    private readonly corporationService: CorporationService
  ) {}
 
  async handle(
    //passwordとemailが必須で要求されている。
    input: CreateEmployeeWithEmailInput,
  ): Promise<EmployeeWithTokenEntity> {
    let authEmployee = null;

    //企業が設定した共有パスワードから企業を取得する。
    const corporation = await this.corporationService.findBySharedPassword(input.sharedPassword);

    //フロントにエラー文を送れるようにしたい。
    if (!corporation) throw Error(FAIL_TO_FIND_CORPORATION)

    try {
      authEmployee = await this.corporateAuthService.createEmployee(input.email, input.password)

      const token = await this.corporateAuthService.createCustomToken(authEmployee.uid)

      const employee = await this.createEmployee.handle({
        ...input,
        firebaseUID: authEmployee.uid
      }, corporation.id)


      return {...employee, token}
    } catch (err){
      if (authEmployee?.uid) {
        await this.corporateAuthService.deleteUser(authEmployee.uid);
      }
      throw Error(`ユーザー登録に失敗しました: ${err}`);
    }
  }
}
