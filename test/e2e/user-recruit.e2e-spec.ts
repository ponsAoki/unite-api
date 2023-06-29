import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { initTest, initTestApplication } from '../init';
import * as request from 'supertest';
import { createTestData, deleteAllTable } from '../fixture-handler';
import { CreateUserRecruitInput } from 'src/user-recruit/dto/create-user-recruit.input';
import { UpdateUserRecruitInput } from 'src/user-recruit/dto/update-user-recruit.input';

initTest();

describe('UserRecruit API', () => {
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
    const { createUsers, createUserRecruits, createUserRecruitParticipants } =
      createTestData(prisma);
    await createUsers();
    await createUserRecruits();
    await createUserRecruitParticipants();
  };

  describe('find all user recruits', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return all user recruits array', async () => {
      await request(app.getHttpServer())
        .get('/user-recruit')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUserRecruits = res.body;
          expect(resUserRecruits.length).toBe(10);
          expect(resUserRecruits[0]).toMatchObject({
            id: 'userRecruitId0',
            hackthonName: 'hackthonName0',
            headline: 'headline0',
            details: 'details0',
            programingSkills: ['HTML', 'CSS', 'JAVA_SCRIPT'],
            developmentPeriod: 'developmentPeriod0',
            hackathonUrl: 'hackathonUrl0',
            numberOfApplicants: 'numberOfApplicants0',
            recruiterId: 'userId0',
          });
        });
    });
  });

  describe('find my owned user recruits', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return a user object', async () => {
      await prisma.userRecruit.create({
        data: {
          hackthonName: 'hackthonName10',
          headline: 'headline10',
          details: 'details10',
          programingSkills: ['HTML', 'CSS', 'JAVA_SCRIPT'],
          developmentPeriod: 'developmentPeriod10',
          hackathonUrl: 'hackathonUrl10',
          numberOfApplicants: 'numberOfApplicants10',
          recruiterId: 'userId0',
        },
      });

      await request(app.getHttpServer())
        .get('/user-recruit/my-recruits')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUserRecruits = res.body;
          expect(resUserRecruits.length).toBe(2);
        });
    });
  });

  describe('find owned user recruits by userId', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return a user object', async () => {
      await prisma.userRecruit.create({
        data: {
          hackthonName: 'hackthonName10',
          headline: 'headline10',
          details: 'details10',
          programingSkills: ['HTML', 'CSS', 'JAVA_SCRIPT'],
          developmentPeriod: 'developmentPeriod10',
          hackathonUrl: 'hackathonUrl10',
          numberOfApplicants: 'numberOfApplicants10',
          recruiterId: 'userId0',
        },
      });

      await request(app.getHttpServer())
        .get('/user-recruit/owned-recruits-by-id/userId0')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUserRecruits = res.body;
          expect(resUserRecruits.length).toBe(2);
        });
    });
  });

  describe('find related user recruits by userId', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return a user object', async () => {
      const participant = await prisma.userRecruitParticipant.findFirst({
        where: { userId: 'userId0' },
      });
      await prisma.userRecruitParticipant.update({
        where: { id: participant.id },
        data: { isApproved: true },
      });

      await request(app.getHttpServer())
        .get('/user-recruit/related-recruits-by-id/userId0')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUserRecruits = res.body;
          expect(resUserRecruits.length).toBe(1);
        });
    });
  });

  describe('find one user recruit by id', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should return a user object', async () => {
      await request(app.getHttpServer())
        .get('/user-recruit/findOne/userRecruitId0')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUserRecruit = res.body;
          expect(resUserRecruit).toMatchObject({
            id: 'userRecruitId0',
            hackthonName: 'hackthonName0',
            headline: 'headline0',
            details: 'details0',
            programingSkills: ['HTML', 'CSS', 'JAVA_SCRIPT'],
            developmentPeriod: 'developmentPeriod0',
            hackathonUrl: 'hackathonUrl0',
            numberOfApplicants: 'numberOfApplicants0',
            recruiterId: 'userId0',
          });
        });
    });
  });

  describe('create a user recruit', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should success in creating a user recruit', async () => {
      const input: CreateUserRecruitInput = {
        hackthonName: 'hackthonName10',
        headline: 'headline10',
        details: 'details10',
        programingSkills: ['HTML', 'CSS', 'JAVA_SCRIPT'],
        developmentPeriod: 'developmentPeriod10',
        hackathonUrl: 'hackathonUrl10',
        numberOfApplicants: 'numberOfApplicants10',
      };

      await request(app.getHttpServer())
        .post('/user-recruit')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(201);

          const resUserRecruit = res.body;
          expect(resUserRecruit).toMatchObject({
            recruiterId: 'userId0',
            ...input,
          });
        });
    });

    it('should fail in creating a user recruit because operator user can not exist', async () => {
      await prisma.userRecruitParticipant.delete({
        where: { id: 'userRecruitParticipantId0' },
      });
      await prisma.userRecruit.delete({ where: { id: 'userRecruitId0' } });
      await prisma.user.delete({ where: { id: 'userId0' } });

      const input: CreateUserRecruitInput = {
        hackthonName: 'hackthonName10',
        headline: 'headline10',
        details: 'details10',
        programingSkills: ['HTML', 'CSS', 'JAVA_SCRIPT'],
        developmentPeriod: 'developmentPeriod10',
        hackathonUrl: 'hackathonUrl10',
        numberOfApplicants: 'numberOfApplicants10',
      };

      await request(app.getHttpServer())
        .post('/user-recruit')
        .send(input)
        .then((res) => {
          expect(res.error).toBeDefined();
          expect(res.status).toBe(403);
        });
    });
  });

  describe('update a user recruit', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should success in updating a user recruit', async () => {
      const input: UpdateUserRecruitInput = {
        hackthonName: 'hackthonName0',
        headline: 'fixed見出し',
        details: 'details0',
        programingSkills: ['HTML', 'C#'],
        developmentPeriod: 'developmentPeriod0',
        hackathonUrl: 'fixedリンク',
        numberOfApplicants: 'numberOfApplicants0',
      };

      await request(app.getHttpServer())
        .put('/user-recruit/userRecruitId0')
        .send(input)
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUserRecruit = res.body;
          expect(resUserRecruit).toMatchObject({
            recruiterId: 'userId0',
            ...input,
          });
        });
    });

    it('should fail in updating a user recruit because operator user can not exist', async () => {
      await prisma.userRecruitParticipant.delete({
        where: { id: 'userRecruitParticipantId0' },
      });
      await prisma.userRecruit.delete({
        where: { id: 'userRecruitId0' },
      });
      await prisma.user.delete({ where: { id: 'userId0' } });

      const input: UpdateUserRecruitInput = {
        hackthonName: 'hackthonName0',
        headline: 'fixed見出し',
        details: 'details0',
        programingSkills: ['HTML', 'C#'],
        developmentPeriod: 'developmentPeriod0',
        hackathonUrl: 'fixedリンク',
        numberOfApplicants: 'numberOfApplicants0',
      };

      await request(app.getHttpServer())
        .put('/user-recruit/userRecruitId0')
        .send(input)
        .then((res) => {
          expect(res.error).toBeDefined();
          expect(res.status).toBe(403);
        });
    });

    it('should fail in updating a user recruit because operator user does not have right to update', async () => {
      await prisma.userRecruit.update({
        where: { id: 'userRecruitId0' },
        data: { recruiterId: 'userId1' },
      });

      const input: UpdateUserRecruitInput = {
        hackthonName: 'hackthonName0',
        headline: 'fixed見出し',
        details: 'details0',
        programingSkills: ['HTML', 'C#'],
        developmentPeriod: 'developmentPeriod0',
        hackathonUrl: 'fixedリンク',
        numberOfApplicants: 'numberOfApplicants0',
      };

      await request(app.getHttpServer())
        .put('/user-recruit/userRecruitId0')
        .send(input)
        .then((res) => {
          expect(res.error).toBeDefined();
          expect(res.status).toBe(403);
        });
    });
  });

  describe('delete a user recruit', () => {
    beforeEach(async () => {
      await createThisTestData();
    });

    it('should success in deleting a user recruit', async () => {
      await prisma.userRecruitParticipant.delete({
        where: { id: 'userRecruitParticipantId0' },
      });

      await request(app.getHttpServer())
        .delete('/user-recruit/userRecruitId0')
        .then((res) => {
          expect(res.error).toBeFalsy();
          expect(res.status).toBe(200);

          const resUserRecruit = res.body;
          expect(resUserRecruit).toMatchObject({
            recruiterId: 'userId0',
            hackthonName: 'hackthonName0',
            headline: 'headline0',
            details: 'details0',
            programingSkills: ['HTML', 'CSS', 'JAVA_SCRIPT'],
            developmentPeriod: 'developmentPeriod0',
            hackathonUrl: 'hackathonUrl0',
            numberOfApplicants: 'numberOfApplicants0',
          });
        });
    });

    it('should fail in deleting a user recruit because operator user can not exist', async () => {
      await prisma.userRecruitParticipant.delete({
        where: { id: 'userRecruitParticipantId0' },
      });
      await prisma.userRecruit.delete({
        where: { id: 'userRecruitId0' },
      });
      await prisma.user.delete({ where: { id: 'userId0' } });

      await request(app.getHttpServer())
        .delete('/user-recruit/userRecruitId0')
        .then((res) => {
          expect(res.error).toBeDefined();
          expect(res.status).toBe(403);
        });
    });

    it('should fail in deleting a user recruit because operator user does not have right to update', async () => {
      await prisma.userRecruit.update({
        where: { id: 'userRecruitId0' },
        data: { recruiterId: 'userId1' },
      });

      await request(app.getHttpServer())
        .delete('/user-recruit/userRecruitId0')
        .then((res) => {
          expect(res.error).toBeDefined();
          expect(res.status).toBe(403);
        });
    });
  });
});
