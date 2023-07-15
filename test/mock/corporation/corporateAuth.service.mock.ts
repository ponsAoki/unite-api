import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export class CorporateAuthServiceMock {
  async createEmployee(email: string, password: string): Promise<UserRecord> {
    return this.dummyEmployeeRecord();
  }

  async createCustomToken(uid: string): Promise<string> {
    return Promise.resolve('token');
  }

  async deleteEmployee(uid: string): Promise<void> {
    return;
  }
  private dummyEmployeeRecord(): UserRecord {
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
