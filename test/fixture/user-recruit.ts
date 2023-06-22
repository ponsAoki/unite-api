import { UserRecruit } from '@prisma/client';

export class TestUserRecruits {
  create(num: number): UserRecruit[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `userRecruitId${n}`,
        hackthonName: `hackthonName${n}`,
        headline: `headline${n}`,
        details: `details${n}`,
        programingSkills: ['HTML', 'CSS', 'JAVA_SCRIPT'],
        developmentPeriod: `developmentPeriod${n}`,
        hackathonUrl: `hackathonUrl${n}`,
        numberOfApplicants: `numberOfApplicants${n}`,
        createdAt: t,
        updatedAt: t,
        recruiterId: `userId${n}`,
      };
    });
  }
}
