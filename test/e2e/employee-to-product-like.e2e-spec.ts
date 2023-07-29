import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { initTest, initTestApplication } from "../init";
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { CreateEmployeeToProductLikeInput } from "src/employee-to-product-like/dto/create-employee-to-product-like.input";

initTest();

describe('EmployeeToProductLike API', () => {
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
    const { createUsers, createProducts, createEmployees, createEmployeeToProductLike, createUserRecruits, createCorporations } = createTestData(prisma);
    await createUsers();
    await createUserRecruits();
    await createProducts();
    await createCorporations();
    await createEmployees();
    await createEmployeeToProductLike();
  };

  describe('POST /employee-to-product-like', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('プロダクトに対して従業員がいいねを押すことに成功する',async () => {
      const input: CreateEmployeeToProductLikeInput = {
        productId: 'productId1',
      }
      await request(app.getHttpServer())
        .post('/employee-to-product-like')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);
        })
    })
  })
})