import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { CorporateAuthUtil } from './corporateAuth.util';

@Injectable()
export class CorporateAuthService {
  //firebaseauthにemployeeを作成する。
  createEmployee(email: string, password: string): Promise<UserRecord> {
    return admin.app('employee').auth().createUser({
      email,
      password,
      disabled: false,
    });
  }

  //Tokenを作成する
  createCustomToken(uid: string): Promise<string> {
    return admin.app('employee').auth().createCustomToken(uid);
  }

  //firebaseAuthから登録したuserを削除する
  deleteEmployee(uid: string): Promise<void> {
    return admin.app('employee').auth().deleteUser(uid);
  }
}
