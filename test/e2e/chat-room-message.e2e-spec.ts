import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { ChatRoomMessageEntity } from 'src/chat-room-message/entities/chat-room-message.entity';

initTest();

describe('ChatRoomMessage API', () => {
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

  describe('GET /chat-room-message/:roomId', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('学生ユーザー同士の1つのチャットルーム内のメッセージ履歴を全権取得できる', async () => {
      const roomId = 'chatRoomId0';
      const operatorParticipantId = 'chatRoomParticipantId0';
      const interlocutorParticipantId = 'chatRoomParticipantId1';
      const messageContent = 'content';

      await prisma.chatRoomParticipant.update({
        where: { id: interlocutorParticipantId },
        data: { roomId },
      });

      const allMessages = await prisma.chatRoomMessage.findMany();
      for (const message of allMessages.slice(0, 5)) {
        await prisma.chatRoomMessage.update({
          where: { id: message.id },
          data: { roomId, senderId: operatorParticipantId },
        });
      }
      for (const message of allMessages.slice(5)) {
        await prisma.chatRoomMessage.update({
          where: { id: message.id },
          data: { roomId, senderId: interlocutorParticipantId },
        });
      }

      await request(app.getHttpServer())
        .get(`/chat-room-message/${roomId}`)
        .then(async (res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const fetchedMessagesInfo = res.body;

          expect(fetchedMessagesInfo).toHaveLength(10);

          fetchedMessagesInfo
            .slice(0, 5)
            .forEach((messageInfo: ChatRoomMessageEntity, i: number) => {
              expect(messageInfo).toMatchObject({
                id: `chatRoomMessageId${i}`,
                content: messageContent,
                roomId,
                senderId: operatorParticipantId,
                senderImage: 'imageUrl0',
                senderName: 'name0',
              });
            });
          fetchedMessagesInfo
            .slice(5)
            .forEach((messageInfo: ChatRoomMessageEntity, i: number) => {
              expect(messageInfo).toMatchObject({
                id: `chatRoomMessageId${i + 5}`,
                content: messageContent,
                roomId,
                senderId: interlocutorParticipantId,
                senderImage: 'imageUrl1',
                senderName: 'name1',
              });
            });
        });
    });

    it('学生ユーザーと企業従業員の1つのチャットルーム内のメッセージ履歴を全権取得できる', async () => {
      const roomId = 'chatRoomId0';
      const operatorParticipantId = 'chatRoomParticipantId0';
      const interlocutorParticipantId = 'chatRoomParticipantId1';
      const messageContent = 'content';

      await prisma.chatRoomParticipant.update({
        where: { id: interlocutorParticipantId },
        data: { roomId, userId: null, employeeId: 'employeeId2' },
      });

      const allMessages = await prisma.chatRoomMessage.findMany();
      for (const message of allMessages.slice(0, 5)) {
        await prisma.chatRoomMessage.update({
          where: { id: message.id },
          data: { roomId, senderId: operatorParticipantId },
        });
      }
      for (const message of allMessages.slice(5)) {
        await prisma.chatRoomMessage.update({
          where: { id: message.id },
          data: { roomId, senderId: interlocutorParticipantId },
        });
      }

      await request(app.getHttpServer())
        .get(`/chat-room-message/${roomId}`)
        .then(async (res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const fetchedMessagesInfo = res.body;

          expect(fetchedMessagesInfo).toHaveLength(10);

          fetchedMessagesInfo
            .slice(0, 5)
            .forEach((messageInfo: ChatRoomMessageEntity, i: number) => {
              expect(messageInfo).toMatchObject({
                id: `chatRoomMessageId${i}`,
                content: messageContent,
                roomId,
                senderId: operatorParticipantId,
                senderImage: 'imageUrl0',
                senderName: 'name0',
              });
            });
          fetchedMessagesInfo
            .slice(5)
            .forEach((messageInfo: ChatRoomMessageEntity, i: number) => {
              expect(messageInfo).toMatchObject({
                id: `chatRoomMessageId${i + 5}`,
                content: messageContent,
                roomId,
                senderId: interlocutorParticipantId,
                senderImage: 'imageURL2',
                senderName: 'name2',
              });
            });
        });
    });
  });
});
