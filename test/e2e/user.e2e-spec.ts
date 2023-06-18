import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { TestUsers } from '../fixture/user';
import { CreateUserWithEmailInput } from 'src/user/dto/create-user-with-email.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';

initTest();

describe('User API', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    //testing module などの初期化
    ({ app, prismaService: prisma } = await initTestApplication());
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  afterEach(async () => {
    //テストケースが終了するたびにテスト用DBの全テーブル削除
    await deleteAllTable(prisma);
  });

  const createThisTestData = async (): Promise<void> => {
    const { createUsers } = createTestData(prisma);
    await createUsers();
  };

  describe('find all users', () => {
    beforeEach(async () => {
      //テストをするのに事前に必要なデータを作成
      await createThisTestData();
    });

    it('should return all users array', async () => {
      //APIコール
      await request(app.getHttpServer())
        .get('/user')
        .then((res) => {
          expect(res.body.errors).toBeUndefined();
          expect(res.status).toBe(200);

          const resUsers = res.body;
          expect(resUsers.length).toBe(10);
          const firstUser = new TestUsers().create(1)[0];
          expect(resUsers[0]).toMatchObject(firstUser);
        });
    });
  });

  describe('find one user by firebase uid', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return a user object', async () => {
      await request(app.getHttpServer())
        .get('/user/find-by-firebase-uid')
        .then((res) => {
          expect(res.body.errors).toBeUndefined();
          expect(res.status).toBe(200);

          const resUser = res.body;
          const firstUser = new TestUsers().create(1)[0];
          expect(resUser).toMatchObject(firstUser);
        });
    });
  });

  describe('find one user by firebase uid without auth verification', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return a user object', async () => {
      await request(app.getHttpServer())
        .get('/user/firebaseUid1')
        .then((res) => {
          expect(res.body.errors).toBeUndefined();
          expect(res.status).toBe(200);

          const resUser = res.body;
          const firstUser = new TestUsers().create(2)[1];
          expect(resUser).toMatchObject(firstUser);
        });
    });
  });

  describe('create a user', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should success in creating a user', async () => {
      const input: CreateUserWithEmailInput = {
        email: 'new@test.com',
        password: 'newPassword',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(input)
        .then((res) => {
          expect(res.body.errors).toBeUndefined();
          expect(res.status).toBe(201);

          const resUser = res.body;
          expect(resUser).toMatchObject({
            firebaseUID: 'uid',
            email: 'new@test.com',
            token: 'token',
          });
        });
    });

    it('should fail in creating a user because email already registered', async () => {
      const input: CreateUserWithEmailInput = {
        email: 'test0@test.com',
        password: 'newPassword',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(input)
        .then((res) => {
          expect(res.error).toBeDefined();
          expect(res.status).toBe(500);
        });
    });
  });

  describe('update a user', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should success in updating a user', async () => {
      const input: UpdateUserInput = {
        email: 'test0@test.com',
        name: 'john',
        programingSkills: ['Python', 'Go', 'Rust'],
      };

      await request(app.getHttpServer())
        .put('/user/update-by-firebase-uid')
        .send(input)
        .then((res) => {
          expect(res.body.errors).toBeUndefined();
          expect(res.status).toBe(200);

          const resUser = res.body;
          expect(resUser).toMatchObject({
            email: 'test0@test.com',
            name: 'john',
            programingSkills: ['Python', 'Go', 'Rust'],
          });
        });
    });
  });
});
