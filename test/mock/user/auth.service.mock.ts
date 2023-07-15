import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export class AuthServiceMock {
  async createUser(email: string, password: string): Promise<UserRecord> {
    return this.dummyUserRecord();
  }

  async createCustomToken(uid: string): Promise<string> {
    return Promise.resolve('token');
  }

  async deleteUser(uid: string): Promise<void> {
    return;
  }
  private dummyUserRecord(): UserRecord {
    return {
      emailVerified: true,
      disabled: false,
      uid: 'uid',
      providerData: [],
      toJSON: (): object => ({}),
      metadata: {
        creationTime: 'creationTime',
        lastSignInTime: 'creationTime',
        lastRefreshTime: null,
        toJSON: (): object => ({}),
      },
    };
  }
}
