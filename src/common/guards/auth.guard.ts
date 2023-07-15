import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';
import { NOT_FOUND_T0KEN, NOT_VALID_TOKEN } from '../constants/message';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Authorizationヘッダーの値がundefined or nullだったらエラー返す
    if (!request.headers.authorization)
      throw new UnauthorizedException(NOT_FOUND_T0KEN);

    //Authorizationヘッダーに`Bearer token`のように設定されているはずなので、下記のようにしてtokenを取得
    const token = request.headers.authorization.split(' ')[1];

    //tokenの検証
    const promise = admin
      .app('user')
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        request['firebaseAuth'] = decodedToken;
        return !!decodedToken;
      })
      .catch(() => {
        throw new UnauthorizedException(NOT_VALID_TOKEN);
      });

    return promise;
  }
}
