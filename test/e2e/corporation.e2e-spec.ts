import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';
import { TestCorporation } from '../fixture/corporation';
import { CreateCorporationInput } from 'src/corporation/dto/create-corporation.input';
import { UpdateCorporationInput } from 'src/corporation/dto/update-corporetion.input';

initTest();

describe('corporation API', () => {
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

  const createThisTestData = async () => {
    const { createCorporations } = createTestData(prisma);
    await createCorporations();
  };

  //企業の全件取得
  describe('find All corporation', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return all corporations', async () => {
      await request(app.getHttpServer())
        .get('/corporation')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resCorporations = res.body;
          expect(resCorporations.length).toBe(10);
          const firstCorporation = new TestCorporation().create(1)[0];
          expect(resCorporations[0]).toMatchObject(firstCorporation);
        });
    });
  });

  //企業を共有パスワードで一件取得
  describe('find one by sharedPassword', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return one employee object', async () => {
      await request(app.getHttpServer())
        .post('/corporation/sharedPassword')
        .send({ sharedPassword: 'sharedPassword0' })
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resCorporation = res.body;
          const firstCorporation = new TestCorporation().create(1)[0];
          expect(resCorporation).toMatchObject(firstCorporation);
        });
    });
  });

  //企業の作成に関するテスト
  describe('create a corporation', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should success in createing a corporation', async () => {
      const input: CreateCorporationInput = {
        email: 'testcorporate@gmail.com',
        sharedPassword: 'sharedPassword100',
      };

      await request(app.getHttpServer())
        .post('/corporation')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resCorporation = res.body;
          expect(resCorporation).toMatchObject({ ...input });
        });
    });
  });

  //企業情報編集に関するテスト
  describe('update corporation-Info', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should success in updating a corporation', async () => {
      const input: UpdateCorporationInput = {
        imageUrl: 'updateImage',
        descriptionOfBusiness: 'updateDescriptionOfBusiness',
        location: 'updatepre',
      };

      await request(app.getHttpServer())
        .put('/corporation/corporationId0')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resCorporation = res.body;
          expect(resCorporation).toMatchObject({ ...input });
        });
    });

    //ファイル (アイコン画像) を送信できるかを単体でチェック
    it('should success in updating a corporation image url', async () => {
      await request(app.getHttpServer())
        .put('/corporation/corporationId0')
        .set({ 'Content-Type': 'multipart/form-data' })
        .attach('imageFile', 'test/files/test_image_1.png')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resCorporation = res.body;
          expect(resCorporation).toMatchObject({
            imageUrl: 'fileUrl0',
          });
        });
    });
  });
});
