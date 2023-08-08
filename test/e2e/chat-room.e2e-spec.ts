import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { ChatRoomWithInterlocutorAndMessageEntity } from 'src/chat-room/entities/chat-room-with-interlocutor-and-message-entity';

initTest();

describe('ChatRoom API', () => {
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
      createCorporations,
      createEmployees,
      createScouts,
      createChatRooms,
      createChatRoomParticipants,
      createChatRoomMessages,
    } = createTestData(prisma);
    await createUsers();
    await createUserRecruits();
    await createUserRecruitApplications();
    await createCorporations();
    await createEmployees();
    await createScouts();
    await createChatRooms();
    await createChatRoomParticipants();
    await createChatRoomMessages();
  };

  describe('GET /chat-room', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('操作ユーザーが関連するチャットルーム一覧を取得できる', async () => {
      const operatorUserId = 'userId0';

      const allParticipants = await prisma.chatRoomParticipant.findMany();
      await Promise.all(
        allParticipants.slice(0, 5).map(async (participant, i) => {
          await prisma.chatRoomParticipant.update({
            where: { id: participant.id },
            data: { roomId: `chatRoomId${i}`, userId: operatorUserId },
          });
        }),
      );
      await Promise.all(
        allParticipants.slice(5, 8).map(async (participant, i) => {
          await prisma.chatRoomParticipant.update({
            where: { id: participant.id },
            data: { roomId: `chatRoomId${i}` },
          });
        }),
      );
      await Promise.all(
        allParticipants.slice(8).map(async (participant, i) => {
          await prisma.chatRoomParticipant.update({
            where: { id: participant.id },
            data: {
              roomId: `chatRoomId${i + 3}`,
              userId: null,
              employeeId: `employeeId${i}`,
            },
          });
        }),
      );

      await request(app.getHttpServer())
        .get('/chat-room')
        .then(async (res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const fetchedRoomsInfo = res.body;

          expect(fetchedRoomsInfo).toHaveLength(5);

          fetchedRoomsInfo.forEach(
            (roomInfo: ChatRoomWithInterlocutorAndMessageEntity, i: number) => {
              expect(roomInfo).toMatchObject({
                id: `chatRoomId${i}`,
                latestMessage: 'content',
              });
              expect(roomInfo.interlocutorName).toContain('name');
              expect(roomInfo.interlocutorImageUrl).toContain('image');
            },
          );
        });
    });
  });
});
