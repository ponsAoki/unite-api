import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { NOT_FOUND_T0KEN, NOT_VALID_TOKEN } from "../constants/message";
import * as admin from 'firebase-admin'

@Injectable()
export class CorporateAUthGurd implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest()

      if (!request.headers.authorization) throw new UnauthorizedException(NOT_FOUND_T0KEN);

      //user側と同じ仕組み
      const token = request.headers.authorization.split(' ')[1];

      const promise = admin
        .app('employee')
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          request['firebaseAuth'] = decodedToken;
          return !!decodedToken;
        })
        .catch(() => {
          throw new UnauthorizedException(NOT_VALID_TOKEN);
        });
      
      return promise
  }
}