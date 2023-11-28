import { EmployeeToProductLike, PeriodLikeSum, Product } from '@prisma/client';

export type ProductWithLikesAndLikeSum = Product & {
  periodLikeSum: PeriodLikeSum[];
  employeeToProductLikes: EmployeeToProductLike[];
};
