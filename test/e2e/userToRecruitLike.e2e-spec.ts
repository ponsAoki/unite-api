import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { initTest, initTestApplication } from "../init";
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { CreateEmployeeToProductLikeInput } from "src/employee-to-product-like/dto/create-employee-to-product-like.input";
import { CreateUserToRecruitLike } from "src/user-to-recruit-like/use-case/create-user-to-recruit-like";
import { CreateUserToRecruitLikeInput } from "src/user-to-recruit-like/dto/create-user-to-recruit-like";

initTest();

describe('UserToRecruitLike API', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    ({ app, prismaService: prisma} = await initTestApplication());
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await deleteAllTable(prisma);
  });

  const createThisTestData =async (): Promise<void> => {
    const { createUsers, createUserRecruits, createUserToRecruitLikes } = createTestData(prisma);
    await createUsers();
    await createUserRecruits();
    await createUserToRecruitLikes();
  };

  describe('POST /user-to-recruit-like', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('募集に対してユーザーがいいねを押すことに成功する',async () => {
      const input: CreateUserToRecruitLikeInput = {
        recruitId: 'userRecruitId1',
      }
      await request(app.getHttpServer())
        .post('/user-to-recruit-like')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);
        })
    })

    it('募集に対してユーザーがいいねを押すことに失敗する',async () => {
      const input: CreateUserToRecruitLikeInput = {
        recruitId: 'userRecruitId0',
      }
      await request(app.getHttpServer())
        .post('/user-to-recruit-like')
        .send(input)
        .then((res) => {
          expect(res.error).toBeTruthy();
          expect(res.status).toBe(409);
        })
    })
  })

  describe('POST /user-to-recruit-like/:recruitId', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('いいねを削除することに成功する', async() => {
      await request(app.getHttpServer())
        .delete('/user-to-recruit-like/userRecruitId0')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);
        })
    })
  })
})