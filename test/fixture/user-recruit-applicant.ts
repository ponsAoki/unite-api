import { UserRecruitApplication } from '@prisma/client';

export class TestUserRecruitApplications {
  create(num = 10): UserRecruitApplication[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `userRecruitApplicantId${n}`,
        applicantId: `userId${n}`,
        recruitId: `userRecruitId${n}`,
      };
    });
  }
}
