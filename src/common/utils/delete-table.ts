import { PrismaClient } from '@prisma/client';

export const deleteAllTable = async (prisma: PrismaClient): Promise<void> => {
  const deleteUsers = prisma.user.deleteMany();
  const deleteUserRecruits = prisma.userRecruit.deleteMany();
  const deleteUserRecruitApplicants = prisma.userRecruitApplicant.deleteMany();

  await prisma.$transaction([
    deleteUserRecruitApplicants,
    deleteUserRecruits,
    deleteUsers,
  ]);
};
