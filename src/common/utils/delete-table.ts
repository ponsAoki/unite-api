import { PrismaClient } from '@prisma/client';

export const deleteAllTable = async (prisma: PrismaClient): Promise<void> => {
  const deleteUsers = prisma.user.deleteMany();
  const deleteUserRecruits = prisma.userRecruit.deleteMany();
  const deleteUserRecruitApplications =
    prisma.userRecruitApplication.deleteMany();
  const deleteUserRecruitParticipants =
    prisma.userRecruitParticipant.deleteMany();
  const deleteUserToRecruitLikes = prisma.userToRecruitLike.deleteMany();
  const deleteProducts = prisma.product.deleteMany();
  const deleteCorporations = prisma.corporation.deleteMany();
  const deleteEmployees = prisma.employee.deleteMany(); 
  const deleteEmployeeToProductLikes = prisma.employeeToProductLike.deleteMany();
  const deletePeriodLikeSum = prisma.periodLikeSum.deleteMany();
  const deleteChatRooms = prisma.chatRoom.deleteMany();
  const deleteChatRoomParticipants = prisma.chatRoomParticipant.deleteMany();
  const deleteChatRoomMessages = prisma.chatRoomMessage.deleteMany();

  await prisma.$transaction([
    deleteUserRecruitParticipants,
    deleteUserToRecruitLikes,
    deleteUserRecruitApplications,
    deleteUserRecruits,
    deleteUsers,
    deletePeriodLikeSum,
    deleteEmployeeToProductLikes,
    deleteProducts,
    deleteEmployees,
    deleteCorporations,
    deleteChatRoomMessages,
    deleteChatRoomParticipants,
    deleteChatRooms,
  ]);
};
