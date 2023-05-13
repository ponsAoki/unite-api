import { Prisma, UserRecruit } from '@prisma/client';

export class UserRecruitEntity implements UserRecruit {
  id: string;
  recruiterId: string;
  createdAt: Date;
  updatedAt: Date;
  headline: string;
  hackthonName: string;
  details: string;
  programingSkills: Prisma.JsonValue;
  developmentPeriod: string;
  hackathonUrl: string;
  numberOfApplicants: string;
}
