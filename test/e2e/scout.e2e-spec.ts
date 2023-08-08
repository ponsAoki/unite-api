import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { APPLY_FIRST_MESSAGE } from 'src/common/constants/message';
import { SendScoutInput } from 'src/scout/dto/send-scout.input';

initTest();

describe('Scout API', () => {
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
    const { createUsers, createCorporations, createEmployees } =
      createTestData(prisma);
    await createUsers();
    await createCorporations();
    await createEmployees();
  };

  describe('POST /scout/send-scout', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('企業従業員から学生ユーザーへのスカウトが成功する', async () => {
      const scoutingCorporationId = 'corporationId0';
      const scoutingEmployeeId = 'employeeId0';
      const scoutedUserId = 'userId0';

      const beforeChatRoomCounts = await prisma.chatRoom.count();
      const beforeChatRoomParticipantCounts =
        await prisma.chatRoomParticipant.count();

      const input: SendScoutInput = {
        userId: scoutedUserId,
      };

      await request(app.getHttpServer())
        .post('/scout/send-scout')
        .send(input)
        .then(async (res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resData = res.body;
          expect(resData).toMatchObject({
            ...input,
            corporationId: scoutingCorporationId,
            employeeId: scoutingEmployeeId,
          });
          expect(resData.roomId).not.toBe(null);

          const afterChatRoomCounts = await prisma.chatRoom.count();
          const afterChatRoomParticipantCounts =
            await prisma.chatRoomParticipant.count();

          //意図したチャットルームが1つ作成されていること
          expect(afterChatRoomCounts).toBe(beforeChatRoomCounts + 1);
          const createdRoom = await prisma.chatRoom.findUnique({
            where: { id: resData.roomId },
          });
          expect(createdRoom).toBeDefined();

          //スカウトをした企業従業員とスカウトされた学生ユーザーがチャットの参加者になっていること
          const createdParticipantsCounts =
            (await prisma.chatRoomParticipant.count({
              where: { userId: scoutedUserId },
            })) +
            (await prisma.chatRoomParticipant.count({
              where: { employeeId: scoutingEmployeeId },
            }));
          expect(afterChatRoomParticipantCounts).toBe(
            beforeChatRoomParticipantCounts + createdParticipantsCounts,
          );

          //スカウトを行った企業従業員から最初のメッセージが正しく送られていること
          const senderParticipant = await prisma.chatRoomParticipant.findFirst({
            where: { employeeId: scoutingEmployeeId },
          });
          const createdMessage = await prisma.chatRoomMessage.findFirst({
            where: { roomId: createdRoom.id, senderId: senderParticipant.id },
          });
          expect(createdMessage.content).toBe(APPLY_FIRST_MESSAGE);
        });
    });
  });
});
