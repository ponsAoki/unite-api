import { ProductWithApprovedUserRecruitParticipantsEntity } from "./product-with-user-and-recruiter-and-like-count";

export class ProductWithLikeCountEntity {
  productWithRecruiterAndUsers: ProductWithApprovedUserRecruitParticipantsEntity;
  likesCount: number;
}