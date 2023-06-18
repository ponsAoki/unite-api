import { UserRecruitApplication } from '@prisma/client';

export class UserRecruitApplicationEntity implements UserRecruitApplication {
  id: string;
  applicantId: string;
  recruitId: string;
}
