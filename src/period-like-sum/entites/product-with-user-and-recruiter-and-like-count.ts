
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserRecruitParticipantEntity } from 'src/user-recruit-participant/entities/user-recruit-participant.entity';

export class ProductWithApprovedUserRecruitParticipantsEntity extends ProductEntity {
  recruit: {
    recruiter: {
      name: string;
      imageUrl: string;
    };
    userRecruitParticipant: {
      where: {
        isApproved: true
      },
      user: {
        name: string;
        imageUrl: string;
      };
    }[];
  };
}
