import { PrismaClient } from '@prisma/client';
import { TestUsers } from './fixture/user';
import { deleteAllTable as _deleteAllTable } from 'src/common/utils/delete-table';
import { TestUserRecruits } from './fixture/user-recruit';
import { TestUserRecruitApplications } from './fixture/user-recruit-applicant';
import { TestUserRecruitParticipants } from './fixture/user-recruit-participant';
import { TestEmployee } from './fixture/employee';
import { TestCorporation } from './fixture/corporation';
import { TestEmployeeToProductLike } from './fixture/employee-to-product-like';
import { TestProduct } from './fixture/product';
import { TestPeriodLikeSum } from './fixture/period-like-sum';
import { TestComment } from './fixture/comment';
import { TestUserToRecruitLikes } from './fixture/user-to-recruit-like';

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

  const createUserToRecruitLikes =async (num = 10) => {
    await prisma.userToRecruitLike.createMany({
      data: new TestUserToRecruitLikes().create(num)
    })
  }

  const createProducts = async (num = 10) => {
    await prisma.product.createMany({
      data: new TestProduct().create(num),
    })
  }

  const createComments =async (num=10) => {
    await prisma.comment.createMany({
      data: new TestComment().create(num)
    })
  }
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

  const createEmployeeToProductLike = async (num=10) => {
    await prisma.employeeToProductLike.createMany({
      data: new TestEmployeeToProductLike().create(num) 
    })
  }

  const createPeriodLikeSum = async (num=10) => {
    await prisma.periodLikeSum.createMany({
      data: new TestPeriodLikeSum().create(num)
    })
  }

  return {
    createUsers,
    createUserRecruits,
    createUserRecruitApplicants,
    createUserRecruitParticipants,
    createUserToRecruitLikes,
    createProducts,
    createComments,
    createCorporations,
    createEmployees,
    createEmployeeToProductLike,
    createPeriodLikeSum
  };
};

export const deleteAllTable = async (prisma: PrismaClient): Promise<void> => {
  await _deleteAllTable(prisma);
};
