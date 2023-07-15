import { INestApplication } from "@nestjs/common";
import { CreateEmployeeWithEmailInput } from "src/employee/dto/create-employee-with-email.input";
import * as request from 'supertest';
import { PrismaService } from "src/prisma.service";
import { createTestData, deleteAllTable } from '../fixture-handler';
import { UpdateEmployeeInput } from "src/employee/dto/update-employee.input";
import { initTest, initTestApplication } from '../init';
import { TestEmployee } from "../fixture/employee";

initTest();

describe('Employee API', () => {
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
    //各テストケースが終了するたびにテスト用DBの全テーブル削除
    await deleteAllTable(prisma)
  });

  //テスト用のデータを作成
  const createThisTestData = async () => {
    const { createEmployees, createCorporations } = createTestData(prisma);
    await createCorporations()
    await createEmployees()
  };

  //全件取得のテストケース
  describe('find all employees', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return all employees array', async () => {
      //APIコール
      await request(app.getHttpServer())
        .get('/employee')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resEmployees = res.body;
          expect(resEmployees.length).toBe(10);
          const firstEmployee = new TestEmployee().create(1)[0];
          expect(resEmployees[0]).toMatchObject(firstEmployee)
        })
    })
  });

  //一件取得のテストケース
  describe('find one employee by firebaseUID', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return one employee object',async () => {
      await request(app.getHttpServer())
        .get('/employee/find-by-firebaseUID')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resEmployee = res.body;
          const firstEmployee = new TestEmployee().create(1)[0];
          expect(resEmployee).toMatchObject(firstEmployee);
        })
    })
  })

  //新規作成のテストケース
  describe('create a employee with email, password and sharedPassword', () => {
    beforeEach(async () => {
      await createThisTestData()
    });

    it('should success in cerateing a employee', async () => {
      const input: CreateEmployeeWithEmailInput = {
        email: 'new@test.com',
        password: 'newPassword',
        sharedPassword: 'sharedPassword0',
      }

      await request(app.getHttpServer())
        .post('/employee')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resEmployee = res.body;
          expect(resEmployee).toMatchObject({
            firebaseUID: 'uid',
            email: 'new@test.com',
            token: 'token',
          });
        });
    });
  });

  //情報編集のテストケース
  describe('update a employee', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should success in updating a employee', async () => {
      const input: UpdateEmployeeInput = {
        email: 'corporateTest@test.com',
        name: 'testTaro',
        imageUrl: 'testtesttest',
        introduction: 'hello, Jun !!',
        phoneNumber: '012-3456-7891'
      }

      await request(app.getHttpServer())
        .put('/employee/update-by-firebaseUID')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resEmployee = res.body;
          expect(resEmployee).toMatchObject({
            email: 'corporateTest@test.com',
            name: 'testTaro',
            imageUrl: 'testtesttest',
            introduction: 'hello, Jun !!',
            phoneNumber: '012-3456-7891'
          });
        });
    });
  });
});

