import { PeriodLikeSum, Product, User, UserRecruit, UserRecruitParticipant } from "@prisma/client";
import { ProductEntity } from "src/product/entities/product.entity";

export class PeriodLikeSumEntity implements PeriodLikeSum {
  id: string;
  productId: string;
  likesCount: number;
  createdAt: Date;
  product: Product;
  recruit?: UserRecruit & {
    recruiter: User;
    userRecruitParticipant: {
      where: {
        isApproved: true
      },
      user: User
    }[];
  };
}