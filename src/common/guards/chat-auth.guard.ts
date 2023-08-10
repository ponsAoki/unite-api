import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { EmployeeService } from 'src/employee/employee.service';
import { UserService } from 'src/user/user.service';
import { INVALID_TOKEN, NOT_FOUND_TOKEN } from '../constants/message';
import { Request } from 'express';
import { CorporationService } from 'src/corporation/corporation.service';

@Injectable()
export class ChatAuthGuard implements CanActivate {
  private request: Request;

  constructor(
    private readonly userService: UserService,
    private readonly employeeService: EmployeeService,
    private readonly corporationService: CorporationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.request = context.switchToHttp().getRequest();

    if (!this.request.headers.authorization) {
      throw new UnauthorizedException(NOT_FOUND_TOKEN);
    }

    const token = this.request.headers.authorization.split(' ')[1];

    const promiseForUserToken = admin.app('user').auth().verifyIdToken(token);

    const promiseForEmployeeToken = admin
      .app('employee')
      .auth()
      .verifyIdToken(token);

    const promises = await Promise.allSettled([
      promiseForUserToken,
      promiseForEmployeeToken,
    ]);

    switch (true) {
      case promises[0].status === 'fulfilled':
        const userDecodedToken = await promiseForUserToken;
        return await this.isExistingUser(userDecodedToken.uid, this.request);
      case promises[1].status === 'fulfilled':
        const employeeDecodedToken = await promiseForEmployeeToken;
        return await this.isExistingEmployee(
          employeeDecodedToken.uid,
          this.request,
        );
      default:
        throw new UnauthorizedException(INVALID_TOKEN);
    }
  }

  private async isExistingUser(
    firebaseUid: string,
    request: Request,
  ): Promise<boolean> {
    const user = await this.userService.findByFirebaseUID(firebaseUid);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    request['user'] = user;

    return !!user;
  }

  private async isExistingEmployee(
    firebaseUid: string,
    request: Request,
  ): Promise<boolean> {
    const employee = await this.employeeService.findByFirebaseUID(firebaseUid);
    if (!employee) {
      throw new UnauthorizedException('employee not found');
    }
    request['employee'] = employee;

    const corporation = await this.corporationService.find(
      employee.corporationId,
    );
    if (!corporation) {
      throw new UnauthorizedException('corporation not found');
    }
    request['corporation'] = corporation;

    return !!employee && !!corporation;
  }
}
