import { PrismaClient } from '@prisma/client';
import { TestUsers } from './fixture/user';
import { deleteAllTable as _deleteAllTable } from 'src/common/utils/delete-table';
import { TestUserRecruits } from './fixture/user-recruit';
import { TestUserRecruitApplications } from './fixture/user-recruit-applicant';
import { TestUserRecruitParticipants } from './fixture/user-recruit-participant';
import { TestEmployee } from './fixture/employee';
import { TestCorporation } from './fixture/corporation';

export const createTestData = (prisma: PrismaClient) => {
  const createUsers = async (num = 10) => {
    await prisma.user.createMany({ data: new TestUsers().create(num) });
  };

  const createUserRecruits = async (num = 10) => {
    await prisma.userRecruit.createMany({
      data: new TestUserRecruits().create(num),
    });
  };

  const createUserRecruitApplicants = async (num = 10) => {
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
      data: new TestCorporation().create(num)
    })
  }

  const createEmployees = async (num = 10) => {
    await prisma.employee.createMany({
      data: new TestEmployee().create(num)
    })
  } 

  return {
    createUsers,
    createUserRecruits,
    createUserRecruitApplicants,
    createUserRecruitParticipants,
    createCorporations,
    createEmployees,
  };
};

export const deleteAllTable = async (prisma: PrismaClient): Promise<void> => {
  await _deleteAllTable(prisma);
};
