import { Prisma, Product, UserRecruit } from '@prisma/client';

export class UserRecruitEntity implements UserRecruit {
  id: string;
  recruiterId: string;
  createdAt: Date;
  updatedAt: Date;
  headline: string;
  hackathonName: string;
  hackathonUrl: string;
  details: string;
  programingSkills: Prisma.JsonValue;
  developmentStartDate: string;
  developmentEndDate: string;
  numberOfApplicants: number;
  recruiter?: string;
  product?: Product;
}
