import { PrismaClient } from '@prisma/client';
import { TestUsers } from './fixture/user';
import { deleteAllTable as _deleteAllTable } from 'src/common/utils/delete-table';
import { TestUserRecruits } from './fixture/user-recruit';
import { TestUserRecruitApplications } from './fixture/user-recruit-application';
import { TestUserRecruitParticipants } from './fixture/user-recruit-participant';
import { TestEmployee } from './fixture/employee';
import { TestCorporation } from './fixture/corporation';
import { TestChatRooms } from './fixture/chat-room';
import { TestChatRoomParticipants } from './fixture/chat-room-participant';
import { TestChatRoomMessages } from './fixture/chat-room-message';
import { INestApplication } from '@nestjs/common';
import { io } from 'socket.io-client';

export const createTestData = (prisma: PrismaClient) => {
  const createUsers = async (num = 10) => {
    await prisma.user.createMany({ data: new TestUsers().create(num) });
  };

  const createUserRecruits = async (num = 10) => {
    await prisma.userRecruit.createMany({
      data: new TestUserRecruits().create(num),
    });
  };

  const createUserRecruitApplications = async (num = 10) => {
    await prisma.userRecruitApplication.createMany({
      data: new TestUserRecruitApplications().create(num),
    });
  };

  const createUserRecruitParticipants = async (num = 10) => {
    await prisma.userRecruitParticipant.createMany({
      data: new TestUserRecruitParticipants().create(num),
    });
  };

  const createCorporations = async (num = 10) => {
    await prisma.corporation.createMany({
      data: new TestCorporation().create(num),
    });
  };

  const createEmployees = async (num = 10) => {
    await prisma.employee.createMany({
      data: new TestEmployee().create(num),
    });
  };

  const createChatRooms = async (num = 10) => {
    await prisma.chatRoom.createMany({
      data: new TestChatRooms().create(num),
    });
  };

  const createChatRoomParticipants = async (num = 10) => {
    await prisma.chatRoomParticipant.createMany({
      data: new TestChatRoomParticipants().create(num),
    });
  };

  const createChatRoomMessages = async (num = 10) => {
    await prisma.chatRoomMessage.createMany({
      data: new TestChatRoomMessages().create(num),
    });
  };

  return {
    createUsers,
    createUserRecruits,
    createUserRecruitApplications,
    createUserRecruitParticipants,
    createCorporations,
    createEmployees,
    createChatRooms,
    createChatRoomParticipants,
    createChatRoomMessages,
  };
};

export const deleteAllTable = async (prisma: PrismaClient): Promise<void> => {
  await _deleteAllTable(prisma);
};

export const getWebsocketClient = (
  app: INestApplication,
  namespace?: string,
) => {
  return io(`http://localhost/8080`, {
    autoConnect: true,
  });
};
