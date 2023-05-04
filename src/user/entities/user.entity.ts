import { Prisma, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  firebaseUID: string;
  name: string;
  email: string;
  imageUrl: string;
  age: number;
  prefecture: string;
  university: string;
  undergraduate: string;
  selfPublicity: string;
  careerVision: string;
  programingSkills: Prisma.JsonValue;
}
