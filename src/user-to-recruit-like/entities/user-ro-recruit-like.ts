import { UserTORecruitLike } from "@prisma/client";

export class UserToRecruitLikeEntity implements UserTORecruitLike {
  id: string
  userId: string;
  recruitId: string;
}