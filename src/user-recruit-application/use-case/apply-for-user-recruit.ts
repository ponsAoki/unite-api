import { Injectable } from '@nestjs/common';
import { ChatRoomMessageService } from 'src/chat-room-message/chat-room-message.service';
import { ChatRoomParticipantService } from 'src/chat-room-participant/chat-room-participant.service';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { UserRecruitService } from 'src/user-recruit/user-recruit.service';
import { UserService } from 'src/user/user.service';
import { APPLY_FIRST_MESSAGE } from '../constants';
import { CreateUserRecruitApplicationInput } from '../dto/create-user-recruit-application.input';
import { UserRecruitApplicationService } from '../user-recruit-application.service';
import { UserRecruitApplicationWithRoomIdEntity } from '../entities/user-recruit-application-with-room-id.entitiy';

@Injectable()
export class ApplyForUserRecruit {
  constructor(
    private readonly userService: UserService,
    private readonly userRecruitApplicationService: UserRecruitApplicationService,
    private readonly chatRoomService: ChatRoomService,
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
    private readonly userRecruitService: UserRecruitService,
    private readonly chatRoomMessageService: ChatRoomMessageService,
  ) {}

  async handle(
    authUserUid: string,
    input: CreateUserRecruitApplicationInput,
  ): Promise<UserRecruitApplicationWithRoomIdEntity> {
    const user = await this.userService.findByFirebaseUID(authUserUid);
    const application = await this.userRecruitApplicationService.create({
      ...input,
      applicantId: user.id,
    });

    // 以降でroomを追加して、応募者から募集者への最初のメッセージを送る処理
    // ルームを作成
    const chatRoom = await this.chatRoomService.create();

    // 応募者をroomの参加者として追加
    const applicantChatParticipant =
      await this.chatRoomParticipantService.create({
        roomId: chatRoom.id,
        userId: user.id,
      });

    // 募集者をroomの参加者として追加
    const recruit = await this.userRecruitService.findById(input.recruitId);
    await this.chatRoomParticipantService.create({
      roomId: chatRoom.id,
      userId: recruit.recruiterId,
    });

    // 応募者からの最初のメッセージを作成
    await this.chatRoomMessageService.create({
      content: APPLY_FIRST_MESSAGE,
      roomId: chatRoom.id,
      senderId: applicantChatParticipant.id,
    });

    return { ...application, roomId: chatRoom.id };
  }
}
