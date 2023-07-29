import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { CreateUserRecruitApplicationInput } from 'src/user-recruit-application/dto/create-user-recruit-application.input';
import { APPLY_FIRST_MESSAGE } from 'src/common/constants/message';

initTest();

describe('UserRecruitApplication API', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    ({ app, prismaService: prisma } = await initTestApplication());
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await deleteAllTable(prisma);
  });

  const createThisTestData = async (): Promise<void> => {
    const { createUsers, createUserRecruits } = createTestData(prisma);
    await createUsers();
    await createUserRecruits();
  };

  describe('POST /user-recruit-application', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('応募に対するユーザーの「話を聞きたい」アクションが成功する', async () => {
      const senderUserId = 'userId0';
      const recipientUserId = 'userId1';
      const recruitId = 'userRecruitId0';

      await prisma.userRecruit.update({
        where: { id: recruitId },
        data: { recruiterId: recipientUserId },
      });

      const beforeChatRoomCounts = await prisma.chatRoom.count();
      const beforeChatRoomParticipantCounts =
        await prisma.chatRoomParticipant.count();

      const input: CreateUserRecruitApplicationInput = {
        recruitId,
      };

      await request(app.getHttpServer())
        .post('/user-recruit-application')
        .send(input)
        .then(async (res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resData = res.body;
          expect(resData).toMatchObject({
            recruitId,
          });

          const afterChatRoomCounts = await prisma.chatRoom.count();
          const afterChatRoomParticipantCounts =
            await prisma.chatRoomParticipant.count();

          //意図したチャットルームが1つ作成されていること
          expect(afterChatRoomCounts).toBe(beforeChatRoomCounts + 1);
          const createdRoom = await prisma.chatRoom.findUnique({
            where: { id: resData.roomId },
          });
          expect(createdRoom).toBeDefined();

          //「話を聞きたい」アクションをしたユーザーと募集主のユーザーがチャットの参加者になっていること
          const createdParticipantsCounts =
            await prisma.chatRoomParticipant.count({
              where: { userId: { in: [senderUserId, recipientUserId] } },
            });
          expect(afterChatRoomParticipantCounts).toBe(
            beforeChatRoomParticipantCounts + createdParticipantsCounts,
          );

          //最初のメッセージが「話を聞きたい」アクションをしたユーザーから正しく送られていること
          const senderParticipant = await prisma.chatRoomParticipant.findFirst({
            where: { userId: senderUserId },
          });
          const createdMessage = await prisma.chatRoomMessage.findFirst({
            where: { roomId: createdRoom.id, senderId: senderParticipant.id },
          });
          expect(createdMessage.content).toBe(APPLY_FIRST_MESSAGE);
        });
    });
  });
});
