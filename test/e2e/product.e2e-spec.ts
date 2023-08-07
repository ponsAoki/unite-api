import { INestApplication } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { createTestData, deleteAllTable } from "../fixture-handler";
import { initTest, initTestApplication } from "../init";
import * as request from 'supertest';
import { UpdateProductInput } from "src/product/dto/update-product-input";
import { createProductInput } from "src/product/dto/create-product-input";

initTest();

describe('Product API', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    ({ app, prismaService: prisma} = await initTestApplication());
  })

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  })

  afterEach(async () => {
    await deleteAllTable(prisma);
  })

  const createThisTestData =async () => {
    const { createUsers, createUserRecruits, createProducts, createUserRecruitParticipants, createComments, createCorporations, createEmployees, createEmployeeToProductLike } = createTestData(prisma);
    await createUsers();
    await createUserRecruits();
    await createUserRecruitParticipants();
    await createProducts();
    await createComments();
    await createCorporations();
    await createEmployees();
    await createEmployeeToProductLike();
  }

  describe('Get /product', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('product全件取得',async () => {
      await request(app.getHttpServer())
        .get('/product')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resProducts = res.body;
          expect(resProducts.length).toBe(10);
        })
    })
  })

  describe('Get /product/my-products', () => {
    beforeEach(async () => {
      await createThisTestData();
    })

    it('自分が作成したproductを全件取得',async () => {
      await request(app.getHttpServer())
        .get('/product/my-products')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resProducts = res.body;
          expect(resProducts.length).toBe(1)
        })
    })
  })

  describe('Get /product/find-related-products', () => {
    beforeEach(async () => {
      await createThisTestData();
    })

    it('自分が関連したproductを全件取得',async () => {
      await request(app.getHttpServer())
        .get('/product/find-related-products')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resProducts = res.body;
          expect(resProducts.length).toBe(1)
        })
    })
  })

  describe('Get /product/findOne/:id', () => {
    beforeEach(async () => {
      await createThisTestData();
    })

    it('productの一件取得',async () => {
      await request(app.getHttpServer())
        .get('/product/findOne/productId0')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resProduct = res.body;
          expect(resProduct).toMatchObject({
            id: 'productId0',
            recruitId: 'userRecruitId0',
            headline: 'headline0',
            url: 'url0',
            detail: 'detail0',
            comment: [
              {
                id: 'commentId0',
                productId: 'productId0',
                userId: 'userId0',
                content: 'content0',
              }
            ],
            employeeToProductLikes: [
              {
                id: 'employeeToProductLike0',
                employeeId: 'employeeId0',
                productId: 'productId0',
              }
            ]
          })

          
        })
    })
  })

  describe('Get /product/findOne/corporation/:id', () => {
    beforeEach(async () => {
      await createThisTestData();
    })

    it('企業側から一件取得',async () => {
      await request(app.getHttpServer())
        .get('/product/findOne/corporation/productId0')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resProduct = res.body;
          expect(resProduct).toMatchObject({
            id: 'productId0',
            recruitId: 'userRecruitId0',
            headline: 'headline0',
            url: 'url0',
            detail: 'detail0',
          })
        })
    })
  })

  describe('Put /product/:id', () => {
    beforeEach(async () => {
      await createThisTestData();
    })

    it('product情報の更新',async () => {
      const input: UpdateProductInput = {
        headline: '変更',
        detail: '変更'
      }

      await request(app.getHttpServer())
        .put('/product/productId0')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resProduct = res.body;
          expect(resProduct).toMatchObject({
            recruitId: 'userRecruitId0',
            ...input,
          });
        })
    })
  })

  //質問する
  //product-userRecruitは1対の関係性　-> 外部キー制約でテストが書けない..
  describe('Post /product/upload', () => {
    beforeEach(async () => {
      await createThisTestData();
    })

    it('新規productを作成する',async () => {
      const recruit = await prisma.userRecruit.create({
        data: {
          id: 'userRecruitId10',
          headline: 'headline10',
          programingSkills: [],
          numberOfApplicants: '3',
          recruiterId: 'userId0'
        }
      })
      const input: createProductInput = {
        recruitId: recruit.id,
        url: 'fileUrl0',
        headline: '変更',
        detail: '変更'
      }

      await request(app.getHttpServer())
        .post('/product/upload')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resProduct = res.body;
          expect(resProduct).toMatchObject({
            ...input,
          });
        })
    })

    it('新規プロダクトの作成に失敗する',async () => {
      const input: createProductInput = {
        recruitId: 'userRecruit0',
        url: 'fileUrl0',
        headline: '変更',
        detail: '変更'
      }

      await request(app.getHttpServer())
        .post('/product/upload')
        .send(input)
        .then((res) => {
          expect(res.error).toBeTruthy();
          expect(res.status).toBe(500);

          const resProduct = res.body;
          expect(resProduct).toMatchObject({
            message: "Internal server error",
            statusCode: 500,
          });
        })
    })
  })

  
});