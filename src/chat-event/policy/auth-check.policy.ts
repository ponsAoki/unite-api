import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthCheckPolicy {
  async handle(headers: any): Promise<any> {
    // Authorizationヘッダーの値がundefined or nullだったらエラー返す
    if (!headers.authorization) throw new Error('認証情報が設定されていません');

    //Authorizationヘッダーに`Bearer token`のように設定されているはずなので、下記のようにしてtokenを取得
    const token = headers.authorization.split(' ')[1];

    //上記tokenをdecodeすると、クライアントが持っていた認証情報 (object) に変換される
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) throw new Error('トークンの検証に失敗しました');
    return decodedToken;
  }
}
