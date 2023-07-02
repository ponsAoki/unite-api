import { UserRecruitParticipant } from '@prisma/client';

export class TestUserRecruitParticipants {
  create(num = 10): UserRecruitParticipant[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `userRecruitParticipantId${n}`,
        userId: `userId${n}`,
        userRecruitId: `userRecruitId${n}`,
        isApproved: false,
      };
    });
  }
}
