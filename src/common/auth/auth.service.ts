import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class AuthService {
  createUser(email: string, password: string): Promise<UserRecord> {
    return admin.auth().createUser({
      email,
      password,
      disabled: false,
    });
  }

  createCustomToken(uid: string): Promise<string> {
    return admin.auth().createCustomToken(uid);
  }

  deleteUser(uid: string): Promise<void> {
    return admin.auth().deleteUser(uid);
  }
}
