import { Injectable } from '@nestjs/common';
import { ScoutWithRoomIdEntity } from '../entities/scount-with-room-id.entity';
import { ScoutService } from '../scout.service';
import { SendScoutInput } from '../dto/send-scout.input';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { ChatRoomParticipantService } from 'src/chat-room-participant/chat-room-participant.service';
import { UtilService } from 'src/common/utils/util.service';
import { ChatRoomMessageService } from 'src/chat-room-message/chat-room-message.service';
import { APPLY_FIRST_MESSAGE } from 'src/common/constants/message';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SendScoutService {
  constructor(
    private readonly scoutService: ScoutService,
    private readonly utilService: UtilService,
    private readonly chatRoomService: ChatRoomService,
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
    private readonly chatRoomMessageService: ChatRoomMessageService,
    private readonly prismaService: PrismaService,
  ) {}

  async handle(
    corporationId: string,
    employeeId: string,
    sendScoutInput: SendScoutInput,
  ): Promise<ScoutWithRoomIdEntity> {
    const createScoutInput = { ...sendScoutInput, corporationId, employeeId };
    const createScout = this.scoutService.create(createScoutInput);

    // 以降でroomを追加して、企業従業員から学生ユーザーへの最初のメッセージを送る処理
    // ルームを作成
    const chatRoomId = this.utilService.cuid();
    const createChatroom = this.chatRoomService.create(chatRoomId);

    // スカウトした企業従業員をroomの参加者として追加
    const scoutingEmployeeParticipantId = this.utilService.cuid();
    const createScoutingEmployeeParticipant =
      this.chatRoomParticipantService.create(
        {
          roomId: chatRoomId,
          employeeId,
        },
        scoutingEmployeeParticipantId,
      );

    // スカウトされた学生ユーザーをroomの参加者として追加
    const createScoutedUserParticipant = this.chatRoomParticipantService.create(
      {
        roomId: chatRoomId,
        userId: sendScoutInput.userId,
      },
    );

    // スカウトした企業従業員からの最初のメッセージを作成
    const createChatRoomMessage = this.chatRoomMessageService.create({
      content: APPLY_FIRST_MESSAGE,
      roomId: chatRoomId,
      senderId: scoutingEmployeeParticipantId,
    });

    const [scout] = await this.prismaService.$transaction([
      createScout,
      createChatroom,
      createScoutingEmployeeParticipant,
      createScoutedUserParticipant,
      createChatRoomMessage,
    ]);

    // クライアントサイドでChatRoomの情報が欲しいのでchatRoomIdを付与
    return { ...scout, roomId: chatRoomId };
  }
}
