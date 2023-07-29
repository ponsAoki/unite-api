import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';

initTest();

describe('ChatRoomParticipant API', () => {
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
    const {
      createUsers,
      createUserRecruits,
      createUserRecruitApplications,
      createChatRooms,
      createChatRoomParticipants,
      createChatRoomMessages,
    } = createTestData(prisma);
    await createUsers();
    await createUserRecruits();
    await createUserRecruitApplications();
    await createChatRooms();
    await createChatRoomParticipants();
    await createChatRoomMessages();
  };

  describe('GET /chat-room-participant/:roomId', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('操作ユーザーのユーザーIDと特定のチャットルームIDから一意のチャット参加者が取得できる', async () => {
      const operatorUserId = 'userId0';
      const roomId = 'chatRoomId0';

      await request(app.getHttpServer())
        .get(`/chat-room-participant/${roomId}`)
        .then(async (res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const fetchedParticipant = res.body;
          expect(fetchedParticipant).toMatchObject({
            roomId,
            userId: operatorUserId,
          });
        });
    });
  });
});
