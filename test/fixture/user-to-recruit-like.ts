import { UserRecruitParticipant, UserToRecruitLike } from '@prisma/client';

export class TestUserToRecruitLikes {
  create(num = 10): UserToRecruitLike[] {
    return [...new Array(num)].map((_, n) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - num + n);
      return {
        id: `userToRecruitLikeId${n}`,
        userId: `userId${n}`,
        recruitId: `userRecruitId${n}`,
      };
    });
  }
}
