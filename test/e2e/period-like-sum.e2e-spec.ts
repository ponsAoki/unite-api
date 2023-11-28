import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';

initTest();

describe('periodLikeSum API', () => {
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
      createProducts,
      createPeriodLikeSum,
    } = createTestData(prisma);
    await createUsers();
    await createUserRecruits();
    await createProducts();
    await createPeriodLikeSum();
  };

  describe('Get /period-like-sum', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it.only('いいねカウントを全件取得することに成功する', async () => {
      await request(app.getHttpServer())
        .get('/period-like-sum')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resPeriodLikeSums = res.body;
          expect(resPeriodLikeSums.length).toBe(10);

          //いいね数が降順に並んでいるかテスト
          resPeriodLikeSums.reduce((acc, curr, index) => {
            if (index > 0) {
              return (
                acc &&
                curr.likesCount <= resPeriodLikeSums[index - 1].likesCount
              );
            }
            return acc;
          });
        });
    });
  });
});
