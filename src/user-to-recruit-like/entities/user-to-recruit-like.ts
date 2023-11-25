import { UserToRecruitLike } from '@prisma/client';

export class UserToRecruitLikeEntity implements UserToRecruitLike {
  id: string;
  userId: string;
  recruitId: string;
}
