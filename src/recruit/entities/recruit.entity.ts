import { Prisma, Recruit } from '@prisma/client';

export class RecruitEntity implements Recruit {
  id: string;
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
