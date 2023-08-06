import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { NOT_FOUND_TOKEN, INVALID_TOKEN } from "../constants/message";
import * as admin from 'firebase-admin'
import { EmployeeService } from "src/employee/employee.service";

@Injectable()
export class CorporateAuthGuard implements CanActivate {
  constructor( private readonly employeeService: EmployeeService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest()

      if (!request.headers.authorization) throw new UnauthorizedException(NOT_FOUND_TOKEN);

      //user側と同じ仕組み
      const token = request.headers.authorization.split(' ')[1];

      const promise = admin
        .app('employee')
        .auth()
        .verifyIdToken(token)
        .then(async(decodedToken) => {
          request['firebaseAuth'] = decodedToken;

          //ここでfirebaseUIDからEmployeeを取得する
          const employee = await this.employeeService.findByFirebaseUID(decodedToken.uid)
          request['employee'] = employee

          //decodedTokenとemployeeが確認できた際にtrueを返す。
          return !!decodedToken && !!employee

        })
        .catch(() => {
          throw new UnauthorizedException(INVALID_TOKEN);
        });
      
      return promise
  }
}

