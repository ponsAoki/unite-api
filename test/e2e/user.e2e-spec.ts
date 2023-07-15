import { Body, INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { TestUsers } from '../fixture/user';
import { CreateUserWithEmailInput } from 'src/user/dto/create-user-with-email.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { EXIST_MAIL_ADDRESS } from 'src/common/constants/message';
import { readFileSync } from 'fs';

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
          expect(res.error).toBeFalsy();
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
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUser = res.body;
          const firstUser = new TestUsers().create(1)[0];
          expect(resUser).toMatchObject(firstUser);
        });
    });
  });

  describe('find one user by id', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return a user object', async () => {
      await request(app.getHttpServer())
        .get('/user/find-by-id/userId0')
        .then((res) => {
          expect(res.error).toBeFalsy();
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
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUser = res.body;
          const firstUser = new TestUsers().create(2)[1];
          expect(resUser).toMatchObject(firstUser);
        });
    });
  });

  describe('create a user with email and password', () => {
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
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resUser = res.body;
          expect(resUser).toMatchObject({
            firebaseUID: 'uid',
            email: 'new@test.com',
            token: 'token',
          });
        });
    });

    it('should fail in creating a user because email already exists', async () => {
      const input: CreateUserWithEmailInput = {
        email: 'test0@test.com',
        password: 'newPassword',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(input)
        .then((res) => {
          expect(res.error).toBeTruthy();
          expect(res.status).toBe(400);
          expect(res.body.message).toBe(EXIST_MAIL_ADDRESS);
        });
    });
  });

  describe('create a user with google or github', () => {
    it('should not create a user because already the user exists', async () => {
      await createThisTestData();

      const beforeUsers = await prisma.user.findMany();

      await request(app.getHttpServer())
        .post('/user/sign-in-with-google-or-github')
        .then(async (res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const afterUsers = await prisma.user.findMany();
          expect(afterUsers.length).toBe(beforeUsers.length);
        });
    });

    it('should success in creating a user', async () => {
      await request(app.getHttpServer())
        .post('/user/sign-in-with-google-or-github')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resUser = res.body;
          expect(resUser).toMatchObject({
            email: 'test0@test.com',
            name: 'name0',
            imageUrl: 'imageUrl0',
          });
        });
    });

    it('should success in creating a user and add github account column because of github provider', async () => {
      await request(app.getHttpServer())
        .post('/user/sign-in-with-google-or-github')
        .send({ githubAccount: 'githubAccount0' })
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resUser = res.body;
          expect(resUser).toMatchObject({
            email: 'test0@test.com',
            name: 'name0',
            imageUrl: 'imageUrl0',
            githubAccount: 'githubAccount0',
          });
        });
    });

    it('should fail in creating a user because email already exists', async () => {
      await createThisTestData();

      await prisma.user.update({
        where: { id: 'userId0' },
        data: { firebaseUID: 'firebaseUid10' },
      });

      await request(app.getHttpServer())
        .post('/user/sign-in-with-google-or-github')
        .then(async (res) => {
          expect(res.error).toBeTruthy();
          expect(res.status).toBe(400);
          expect(res.body.message).toBe(EXIST_MAIL_ADDRESS);
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
        age: 21,
        programingSkills: ['Python', 'Go', 'Rust'],
      };

      await request(app.getHttpServer())
        .put('/user/update-by-firebase-uid')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUser = res.body;
          expect(resUser).toMatchObject({
            email: 'test0@test.com',
            name: 'john',
            age: 21,
            programingSkills: ['Python', 'Go', 'Rust'],
          });
        });
    });

    //ファイル (アイコン画像) を送信できるかを単体でチェック
    it('should success in updating a user image url', async () => {
      await request(app.getHttpServer())
        .put('/user/update-by-firebase-uid')
        .set({ 'Content-Type': 'multipart/form-data' })
        .attach('imageFile', 'test/files/test_image_1.png')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUser = res.body;
          expect(resUser).toMatchObject({
            imageUrl: 'fileUrl0',
          });
        });
    });
  });
});
