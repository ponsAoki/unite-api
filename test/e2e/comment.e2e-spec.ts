import { PrismaService } from 'src/prisma.service';
import { initTest, initTestApplication } from '../init';
import { INestApplication } from '@nestjs/common';
import { createTestData, deleteAllTable } from '../fixture-handler';
import * as request from 'supertest';
import { CreateCommentInput } from 'src/comment/dto/create-comment-input';
import { UpdateCommentInput } from 'src/comment/dto/update-comment-input';
import { FAIL_TO_CREATE_COMMENT } from 'src/common/constants/message';

initTest();

describe('comment API', () => {
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
      createUserRecruitParticipants,
      createProducts,
      createComments,
    } = createTestData(prisma);
    await createUsers();
    await createUserRecruits();
    await createUserRecruitParticipants();
    await createProducts();
    await createComments();
  };

  describe('Post /comment', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    const input: CreateCommentInput = {
      productId: 'productId9',
      content: 'content10',
    };

    const incorrectInput: CreateCommentInput = {
      productId: 'productId0',
      content: 'content10',
    };

    it('自分のコメントの作成に成功する', async () => {
      await request(app.getHttpServer())
        .post('/comment')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resComment = res.body;
          expect(resComment).toMatchObject({
            ...input,
            userId: 'userId0',
          });
        });
    });

    it('コメントの作成に失敗する', async () => {
      await request(app.getHttpServer())
        .post('/comment')
        .send(incorrectInput)
        .then((res) => {
          expect(res.error).toBeTruthy();
          expect(res.status).toBe(409);

          const resComment = res.body;
          expect(resComment).toMatchObject({
            error: 'Conflict',
            message: FAIL_TO_CREATE_COMMENT,
            statusCode: 409,
          });
        });
    });
  });

  describe('Put /comment/:id', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    const input: UpdateCommentInput = {
      content: 'content1+N',
    };

    it('コメント内容の編集', async () => {
      await request(app.getHttpServer())
        .put('/comment/commentId0')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resComment = res.body;
          expect(resComment).toMatchObject({
            id: 'commentId0',
            userId: 'userId0',
            productId: 'productId0',
            ...input,
          });
        });
    });
  });

  describe('delete /comment', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    const input: { id: string } = {
      id: 'commentId0',
    };

    it('コメントの削除に成功する', async () => {
      await request(app.getHttpServer())
        .delete('/comment')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);
        });
    });
  });
});
