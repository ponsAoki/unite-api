import { Prisma, Product, User, UserRecruit, UserRecruitParticipant } from '@prisma/client';

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
  recruiter?: User;
  product?: Product;
  userRecruitParticipant?: UserRecruitParticipant;
}
