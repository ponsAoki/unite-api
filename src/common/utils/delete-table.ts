import { PrismaClient } from '@prisma/client';

export const deleteAllTable = async (prisma: PrismaClient): Promise<void> => {
  const deleteUsers = prisma.user.deleteMany();
  const deleteUserRecruits = prisma.userRecruit.deleteMany();
  const deleteUserRecruitApplications =
    prisma.userRecruitApplication.deleteMany();
  const deleteUserRecruitParticipants =
    prisma.userRecruitParticipant.deleteMany();
  const deleteCorporations = prisma.corporation.deleteMany();
  const deleteEmployees = prisma.employee.deleteMany();
  const deleteChatRooms = prisma.chatRoom.deleteMany();
  const deleteChatRoomParticipants = prisma.chatRoomParticipant.deleteMany();
  const deleteChatRoomMessages = prisma.chatRoomMessage.deleteMany();

  await prisma.$transaction([
    deleteUserRecruitParticipants,
    deleteUserRecruitApplications,
    deleteUserRecruits,
    deleteUsers,
    deleteEmployees,
    deleteCorporations,
    deleteChatRoomMessages,
    deleteChatRoomParticipants,
    deleteChatRooms,
  ]);
};
