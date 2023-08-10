import {
  Comment,
  EmployeeToProductLike,
  Prisma,
  Product,
} from '@prisma/client';

export class ProductEntity implements Product {
  id: string;
  recruitId: string;
  name: string;
  skills: Prisma.JsonValue;
  reasonForSkillSelection: string;
  developmentBackground: string;
  overview: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  comment?: Comment[];
  employeeToProductLikes?: EmployeeToProductLike[];
}
