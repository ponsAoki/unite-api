import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { EmployeeService } from 'src/employee/employee.service';
import { UserService } from 'src/user/user.service';
import { INVALID_TOKEN, NOT_FOUND_TOKEN } from '../../common/constants/message';
import { ChatRoomParticipantService } from 'src/chat-room-participant/chat-room-participant.service';
import { Socket } from 'socket.io';
import { ChatMessageInput } from 'src/chat-event/dto/chat-message.input';
import { ChatRoomParticipantInput } from 'src/chat-room-participant/dto/chat-room-participant.input';

@Injectable()
export class ChatSenderGuard implements CanActivate {
  private client: Socket;
  private messageBody: ChatMessageInput;

  constructor(
    private readonly userService: UserService,
    private readonly employeeService: EmployeeService,
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.client = context.switchToWs().getClient();

    this.messageBody = context.switchToWs().getData();

    if (!this.client.handshake.headers.authorization) {
      throw new UnauthorizedException(NOT_FOUND_TOKEN);
    }

    const token = this.client.handshake.headers.authorization.split(' ')[1];

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
        return await this.isExistingUserParticipant(
          userDecodedToken.uid,
          this.client,
        );
      case promises[1].status === 'fulfilled':
        const employeeDecodedToken = await promiseForEmployeeToken;
        return await this.isExistingEmployeeParticipant(
          employeeDecodedToken.uid,
          this.client,
        );
      default:
        throw new UnauthorizedException(INVALID_TOKEN);
    }
  }

  private async isExistingUserParticipant(
    firebaseUid: string,
    client: Socket,
  ): Promise<boolean> {
    const user = await this.userService.findByFirebaseUID(firebaseUid);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    const chatRoomParticipantInput: ChatRoomParticipantInput = {
      roomId: this.messageBody.roomId,
      userId: user.id,
    };
    const participant =
      await this.chatRoomParticipantService.findByRoomIdAndUserId(
        chatRoomParticipantInput,
      );
    if (!participant) {
      throw new ForbiddenException('participant not found');
    }

    client['sender'] = { participant, user };

    return !!participant;
  }

  private async isExistingEmployeeParticipant(
    firebaseUid: string,
    client: Socket,
  ): Promise<boolean> {
    const employee = await this.employeeService.findByFirebaseUID(firebaseUid);
    if (!employee) {
      throw new UnauthorizedException('employee not found');
    }

    //TODO: ChatRoomParticipantをemployeeとも関連付け、employeeIdとroomIdからparticipantを取得するメソッドをここで呼ぶ

    return !!employee;
  }
}
