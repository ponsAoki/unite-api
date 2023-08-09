import { User, UserRecruit } from '@prisma/client';

export class UserRecruitParticipantEntity {
  id: string;
  userId: string;
  userRecruitId: string;
  isApproved: boolean;

  user?: User;
  recruit?: UserRecruit;
}
