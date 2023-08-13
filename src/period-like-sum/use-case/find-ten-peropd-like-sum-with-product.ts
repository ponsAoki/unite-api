import { ProductService } from "src/product/product.service";
import { PeriodLikeSumService } from "../period-like-sum.service";
import { Injectable } from "@nestjs/common";
import { ProductWithApprovedUserRecruitParticipantsEntity } from "../entites/product-with-user-and-recruiter-and-like-count";
import { ProductWithLikeCountEntity } from "../entites/product-with-like-count.entity";

@Injectable()
export class FindTenProductLikesSumWithProduct {
  constructor(
    private readonly periodLikeSumService: PeriodLikeSumService,
    private readonly productService: ProductService,
  ) {}

  async handle(): Promise<ProductWithLikeCountEntity[]> {
    const periodLikeSums = await this.periodLikeSumService.findTenToSortByFixedTime();

    //Productに紐ずくrecruit(userRecruitParticipant, user)を取得
    const productsWithLikeCountAndRecruiterAndUsers: ProductWithLikeCountEntity[] = await Promise.all(periodLikeSums.map(async (periodLikeSum) => {
      const productWithRecruiterAndUsers: ProductWithApprovedUserRecruitParticipantsEntity = await this.productService.findOneWithRecruiterAndUsers(periodLikeSum.productId);
      const likesCount = periodLikeSum.likesCount;
    
      return {
        productWithRecruiterAndUsers, 
        likesCount
      };
    }));

    return productsWithLikeCountAndRecruiterAndUsers
  }
}

