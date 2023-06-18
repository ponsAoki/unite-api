import { UserRecruitApplicant } from '@prisma/client';

export class TestUserRecruitApplicants {
  create(num = 10): UserRecruitApplicant[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `userRecruitApplicantId${n}`,
        userId: `userId${n}`,
        userRecruitId: `userRecruitId${n}`,
      };
    });
  }
}
