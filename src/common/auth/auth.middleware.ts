import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Authorizationヘッダーの値がundefined or nullだったらエラー返す
    if (!req.headers.authorization) return res.status(401).end();

    //Authorizationヘッダーに`Bearer token`のように設定されているはずなので、下記のようにしてtokenを取得
    const token = req.headers.authorization.split(' ')[1];

    try {
      //上記tokenをdecodeすると、クライアントが持っていた認証情報 (object) に変換される
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log(decodedToken)
      req['firebaseAuth'] = decodedToken;

      next();
    } catch (err) {
      return res.status(401).end();
    }
  }
}
