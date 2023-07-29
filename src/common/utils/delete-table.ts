import { PrismaClient } from '@prisma/client';

export const deleteAllTable = async (prisma: PrismaClient): Promise<void> => {
  const deleteUsers = prisma.user.deleteMany();
  const deleteUserRecruits = prisma.userRecruit.deleteMany();
  const deleteUserRecruitApplications =
    prisma.userRecruitApplication.deleteMany();
  const deleteUserRecruitParticipants =
    prisma.userRecruitParticipant.deleteMany();
  const deleteProducts = prisma.product.deleteMany();
  const deleteCorporations = prisma.corporation.deleteMany();
  const deleteEmployees = prisma.employee.deleteMany(); 
  const deleteEmployeeToProductLikes = prisma.employeeToProductLike.deleteMany();
  const deletePeriodLikeSum = prisma.periodLikeSum.deleteMany();

  await prisma.$transaction([
    deleteUserRecruitParticipants,
    deleteUserRecruitApplications,
    deleteUserRecruits,
    deleteUsers,
    deletePeriodLikeSum,
    deleteEmployeeToProductLikes,
    deleteProducts,
    deleteEmployees,
    deleteCorporations,
  ]);
};
