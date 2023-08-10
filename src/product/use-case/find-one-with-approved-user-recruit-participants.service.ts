import { Injectable } from '@nestjs/common';
import { ProductWithApprovedUserRecruitParticipantsEntity } from '../entities/product-with-approved-user-recruit-participants.entity';
import { ProductService } from '../product.service';
import { UserRecruitParticipantService } from 'src/user-recruit-participant/user-recruit-participant.service';

@Injectable()
export class FindOneWithApprovedUserRecruitParticipantsService {
  constructor(
    private readonly productService: ProductService,
    private readonly userRecruitParticipantService: UserRecruitParticipantService,
  ) {}

  async handle(
    id: string,
  ): Promise<ProductWithApprovedUserRecruitParticipantsEntity> {
    const product = await this.productService.findOne(id);

    const approvedParticipants = (
      await this.userRecruitParticipantService.findManyByRecruitId(
        product.recruitId,
      )
    ).filter((participant) => participant.isApproved);

    return {
      ...product,
      approvedUserRecruitParticipants: approvedParticipants,
    };
  }
}
